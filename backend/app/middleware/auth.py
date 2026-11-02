import logging
from typing import Optional
import httpx
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.config import settings

logger = logging.getLogger(__name__)

_bearer = HTTPBearer(auto_error=True)

# Cached JWKS (refreshed lazily)
_jwks_cache: Optional[dict] = None


def _get_jwks() -> dict:
    global _jwks_cache
    if _jwks_cache is not None:
        return _jwks_cache
    pool_id = settings.COGNITO_USER_POOL_ID
    region = settings.AWS_REGION
    url = (
        f"https://cognito-idp.{region}.amazonaws.com/{pool_id}"
        "/.well-known/jwks.json"
    )
    try:
        response = httpx.get(url, timeout=10)
        response.raise_for_status()
        _jwks_cache = response.json()
        return _jwks_cache
    except Exception as exc:
        logger.error("Failed to fetch Cognito JWKS: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Could not reach authentication server",
        )


def verify_cognito_token(token: str) -> dict:
    """
    Verify a JWT issued by AWS Cognito.
    Returns the decoded claims on success, raises HTTPException on failure.
    Falls back to dev mode if COGNITO_USER_POOL_ID is not configured.
    """
    if not settings.COGNITO_USER_POOL_ID or settings.COGNITO_USER_POOL_ID == "your_pool_id":
        # Dev fallback: accept test/dev admin tokens
        return {"sub": "dev-admin-id", "username": "admin", "email": "dhariwalraj37@gmail.com"}

    try:
        # Decode header to get the key id (kid)
        unverified_headers = jwt.get_unverified_header(token)
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token header: {exc}",
        )

    jwks = _get_jwks()
    matching_key = next(
        (key for key in jwks.get("keys", []) if key["kid"] == unverified_headers.get("kid")),
        None,
    )
    if matching_key is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token signing key not found",
        )

    try:
        claims = jwt.decode(
            token,
            matching_key,
            algorithms=["RS256"],
            audience=settings.COGNITO_CLIENT_ID,
            options={"verify_exp": True},
        )
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token validation failed: {exc}",
        )

    # Ensure the token_use is "id" or "access"
    token_use = claims.get("token_use")
    if token_use not in ("id", "access"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token_use claim",
        )

    return claims


async def require_admin(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer),
) -> dict:
    """
    FastAPI dependency that enforces admin authentication.
    Extracts the Bearer token from the Authorization header.
    If Cognito is configured, verifies against Cognito.
    Otherwise, verifies against HMAC signed admin tokens.
    """
    token = credentials.credentials
    if settings.COGNITO_USER_POOL_ID and settings.COGNITO_USER_POOL_ID != "your_pool_id":
        return verify_cognito_token(token)

    from app.routers.auth import verify_token
    if verify_token(token):
        return {"sub": "admin", "username": settings.ADMIN_USERNAME, "email": settings.ADMIN_EMAIL}

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired admin session token. Please log in again.",
    )
