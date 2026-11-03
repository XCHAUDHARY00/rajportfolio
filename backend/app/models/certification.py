from typing import Optional
from pydantic import BaseModel


class CertificationCreate(BaseModel):
    name: str
    issuer: str
    issue_date: str
    verify_url: Optional[str] = None
    description: Optional[str] = None
    badge_url: Optional[str] = None


class CertificationResponse(CertificationCreate):
    id: str
    badge_url: Optional[str] = None
    created_at: str
