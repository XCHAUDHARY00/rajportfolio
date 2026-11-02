import base64
import hashlib
import hmac
import time
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])


class LoginRequest(BaseModel):
    username: str
    password: str


def generate_token(username: str) -> str:
    timestamp = str(int(time.time()))
    raw_sig = f"{username}:{timestamp}"
    signature = hmac.new(
        settings.JWT_SECRET.encode(),
        raw_sig.encode(),
        hashlib.sha256
    ).hexdigest()
    payload = f"{username}:{timestamp}:{signature}"
    return base64.b64encode(payload.encode()).decode()


def verify_token(token: str) -> bool:
    try:
        decoded = base64.b64decode(token.encode()).decode()
        parts = decoded.split(":")
        if len(parts) != 3:
            return False
        username, timestamp, signature = parts
        raw_sig = f"{username}:{timestamp}"
        expected = hmac.new(
            settings.JWT_SECRET.encode(),
            raw_sig.encode(),
            hashlib.sha256
        ).hexdigest()
        if not hmac.compare_digest(signature, expected):
            return False
        # Valid for 30 days
        if time.time() - int(timestamp) > 30 * 86400:
            return False
        return True
    except Exception:
        return False


@router.post("/login")
def login(req: LoginRequest):
    valid_usernames = [
        settings.ADMIN_USERNAME.strip().lower(),
        settings.ADMIN_EMAIL.strip().lower(),
    ]
    u = req.username.strip().lower()
    p = req.password.strip()

    if u in valid_usernames and p == settings.ADMIN_PASSWORD:
        token = generate_token(u)
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "username": settings.ADMIN_USERNAME,
                "email": settings.ADMIN_EMAIL,
            },
        }

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid username or password",
    )
