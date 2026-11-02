import uuid
from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

from app.middleware.auth import require_admin
from app.models.certification import CertificationCreate, CertificationResponse
from app.services import dynamodb as db
from app.services import s3

router = APIRouter(prefix="/api/certifications", tags=["certifications"])

TABLE = "certifications"

_SEED_CERTS = [
    {
        "id": "cert-001",
        "name": "Software Engineering Job Simulation",
        "issuer": "JPMorgan Chase & Co. (Forage)",
        "issue_date": "2024",
        "verify_url": None,
        "description": (
            "Completed JPMorgan Chase's software engineering virtual experience, "
            "fixing broken code and using JPMorgan's open-source Perspective library "
            "to build a financial data feed dashboard."
        ),
        "badge_url": None,
        "created_at": datetime.utcnow().isoformat(),
    },
    {
        "id": "cert-002",
        "name": "Generative AI Career Essentials",
        "issuer": "Infosys Springboard",
        "issue_date": "2024",
        "verify_url": None,
        "description": (
            "Covered fundamentals of Generative AI, prompt engineering, "
            "LLM architecture, and responsible AI practices."
        ),
        "badge_url": None,
        "created_at": datetime.utcnow().isoformat(),
    },
    {
        "id": "cert-003",
        "name": "Hacknovate Participation",
        "issuer": "AKGEC Hacknovate",
        "issue_date": "2025",
        "verify_url": None,
        "description": (
            "Participated in Hacknovate hackathon at Ajay Kumar Garg Engineering "
            "College, building innovative solutions under time constraints."
        ),
        "badge_url": None,
        "created_at": datetime.utcnow().isoformat(),
    },
]


def _seed_if_empty():
    items = db.scan_table(TABLE)
    if not items:
        for cert in _SEED_CERTS:
            db.put_item(TABLE, cert)


# ── Public ────────────────────────────────────────────────────────────────────

@router.get("", response_model=List[CertificationResponse])
def list_certifications():
    """List all certifications (public)."""
    _seed_if_empty()
    items = db.scan_table(TABLE)
    return sorted(items, key=lambda x: x.get("issue_date", ""), reverse=True)


# ── Admin ─────────────────────────────────────────────────────────────────────

@router.post("", response_model=CertificationResponse, status_code=201)
def create_certification(body: CertificationCreate, _: dict = Depends(require_admin)):
    """Create a certification (admin only)."""
    item = {
        "id": str(uuid.uuid4()),
        "badge_url": None,
        "created_at": datetime.utcnow().isoformat(),
        **body.model_dump(),
    }
    return db.put_item(TABLE, item)


@router.put("/{cert_id}", response_model=CertificationResponse)
def update_certification(cert_id: str, body: CertificationCreate, _: dict = Depends(require_admin)):
    """Update a certification (admin only)."""
    if not db.get_item(TABLE, {"id": cert_id}):
        raise HTTPException(status_code=404, detail="Certification not found")
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    return db.update_item(TABLE, {"id": cert_id}, updates)


@router.delete("/{cert_id}", status_code=204)
def delete_certification(cert_id: str, _: dict = Depends(require_admin)):
    """Delete a certification (admin only)."""
    item = db.get_item(TABLE, {"id": cert_id})
    if not item:
        raise HTTPException(status_code=404, detail="Certification not found")
    if item.get("badge_url"):
        key = s3.key_from_url(item["badge_url"])
        if key:
            s3.delete_file(key)
    db.delete_item(TABLE, {"id": cert_id})


@router.post("/{cert_id}/badge", response_model=CertificationResponse)
async def upload_badge(
    cert_id: str,
    file: UploadFile = File(...),
    _: dict = Depends(require_admin),
):
    """Upload a certification badge image to S3 (admin only)."""
    item = db.get_item(TABLE, {"id": cert_id})
    if not item:
        raise HTTPException(status_code=404, detail="Certification not found")
    if item.get("badge_url"):
        key = s3.key_from_url(item["badge_url"])
        if key:
            s3.delete_file(key)
    content = await file.read()
    url = s3.upload_file(
        content,
        file.filename or "badge.png",
        "certifications/",
        file.content_type or "image/png",
    )
    return db.update_item(TABLE, {"id": cert_id}, {"badge_url": url})
