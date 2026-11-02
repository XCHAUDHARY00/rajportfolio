import time
from pydantic import BaseModel, EmailStr
from fastapi import APIRouter, HTTPException

from app.services.ses import send_contact_email

router = APIRouter(prefix="/api/contact", tags=["contact"])

# Simple in-memory rate limiter: tracks (ip → last_sent_timestamp)
_rate_limit_store: dict[str, float] = {}
RATE_LIMIT_SECONDS = 60  # one message per minute per "sender"


class ContactForm(BaseModel):
    name: str
    email: str  # plain str so we don't need EmailStr at runtime
    subject: str
    message: str


@router.post("", status_code=200)
def send_contact(body: ContactForm):
    """
    Send a contact-form email via AWS SES (public).
    Basic rate limit: one submission per email address per minute.
    """
    sender_key = body.email.lower().strip()
    now = time.time()

    last_sent = _rate_limit_store.get(sender_key, 0.0)
    if now - last_sent < RATE_LIMIT_SECONDS:
        wait = int(RATE_LIMIT_SECONDS - (now - last_sent))
        raise HTTPException(
            status_code=429,
            detail=f"Please wait {wait} seconds before sending another message.",
        )

    send_contact_email(
        name=body.name.strip(),
        email=sender_key,
        subject=body.subject.strip(),
        message=body.message.strip(),
    )

    _rate_limit_store[sender_key] = now
    return {"message": "Your message has been sent successfully. Raj will get back to you soon!"}
