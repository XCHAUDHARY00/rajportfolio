import logging
import os
from pathlib import Path
import uuid
import boto3
from botocore.exceptions import BotoCoreError, ClientError
from fastapi import HTTPException
from app.config import settings

logger = logging.getLogger(__name__)

_s3_client = None

VALID_FOLDERS = ("profile/", "projects/", "certifications/", "experience/", "resume/")

UPLOADS_DIR = Path(__file__).resolve().parent.parent.parent / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)


def is_aws_configured() -> bool:
    """Return True if AWS credentials are provided and not dummy values."""
    return bool(
        settings.AWS_ACCESS_KEY_ID
        and settings.AWS_SECRET_ACCESS_KEY
        and settings.AWS_ACCESS_KEY_ID != "your_key"
    )


def _get_client():
    global _s3_client
    if _s3_client is None:
        kwargs = {"region_name": settings.AWS_REGION}
        if settings.AWS_ACCESS_KEY_ID and settings.AWS_SECRET_ACCESS_KEY:
            kwargs["aws_access_key_id"] = settings.AWS_ACCESS_KEY_ID
            kwargs["aws_secret_access_key"] = settings.AWS_SECRET_ACCESS_KEY
        _s3_client = boto3.client("s3", **kwargs)
    return _s3_client


def _build_public_url(key: str) -> str:
    """Return a CloudFront URL when configured, otherwise a direct S3 URL."""
    if settings.CLOUDFRONT_URL:
        base = settings.CLOUDFRONT_URL.rstrip("/")
        return f"{base}/{key}"
    bucket = settings.S3_BUCKET_NAME
    region = settings.AWS_REGION
    return f"https://{bucket}.s3.{region}.amazonaws.com/{key}"


def upload_file(
    file_bytes: bytes,
    filename: str,
    folder: str,
    content_type: str = "application/octet-stream",
) -> str:
    """
    Upload file_bytes to S3 under folder/filename.
    Falls back to local file storage if AWS is not configured.
    """
    if not folder.endswith("/"):
        folder = folder + "/"
    unique_name = f"{uuid.uuid4().hex}_{filename}"
    key = f"{folder}{unique_name}"

    if not is_aws_configured():
        dest_dir = UPLOADS_DIR / folder.strip("/")
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest_path = dest_dir / unique_name
        dest_path.write_bytes(file_bytes)
        # Return local static URL
        return f"http://localhost:8000/uploads/{folder.strip('/')}/{unique_name}"

    try:
        _get_client().put_object(
            Bucket=settings.S3_BUCKET_NAME,
            Key=key,
            Body=file_bytes,
            ContentType=content_type,
        )
        return _build_public_url(key)
    except (ClientError, BotoCoreError) as e:
        logger.warning("S3 upload failed, falling back to local file storage: %s", e)
        dest_dir = UPLOADS_DIR / folder.strip("/")
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest_path = dest_dir / unique_name
        dest_path.write_bytes(file_bytes)
        return f"http://localhost:8000/uploads/{folder.strip('/')}/{unique_name}"


def delete_file(key: str) -> None:
    """Delete an object from S3 or local directory."""
    if not is_aws_configured():
        local_path = UPLOADS_DIR / key
        if local_path.exists():
            local_path.unlink()
        return

    try:
        _get_client().delete_object(Bucket=settings.S3_BUCKET_NAME, Key=key)
    except (ClientError, BotoCoreError) as e:
        logger.warning("S3 delete error: %s", e)


def generate_presigned_url(key: str, expiry_seconds: int = 3600) -> str:
    """Generate a presigned GET URL for a private S3 object."""
    if not is_aws_configured():
        return f"http://localhost:8000/uploads/{key}"

    try:
        url = _get_client().generate_presigned_url(
            "get_object",
            Params={"Bucket": settings.S3_BUCKET_NAME, "Key": key},
            ExpiresIn=expiry_seconds,
        )
        return url
    except (ClientError, BotoCoreError) as e:
        logger.warning("S3 presigned URL error: %s", e)
        return f"http://localhost:8000/uploads/{key}"


def key_from_url(url: str) -> str | None:
    """Extract object key from URL."""
    if not url:
        return None
    try:
        if "/uploads/" in url:
            return url.split("/uploads/", 1)[-1]
        if settings.CLOUDFRONT_URL and url.startswith(settings.CLOUDFRONT_URL):
            return url[len(settings.CLOUDFRONT_URL.rstrip("/")) + 1 :]
        prefix = f"https://{settings.S3_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/"
        if url.startswith(prefix):
            return url[len(prefix):]
    except Exception:
        pass
    return None
