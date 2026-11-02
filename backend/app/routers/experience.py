import uuid
from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

from app.middleware.auth import require_admin
from app.models.experience import ExperienceCreate, ExperienceResponse
from app.services import dynamodb as db
from app.services import s3

router = APIRouter(prefix="/api/experience", tags=["experience"])

TABLE = "experience"


def _seed_if_empty():
    items = db.scan_table(TABLE)
    if not items:
        # Placeholder — no specific internship data was in the provided resume
        pass


# ── Public ────────────────────────────────────────────────────────────────────

@router.get("", response_model=List[ExperienceResponse])
def list_experience():
    """List all experience entries sorted newest first (public)."""
    _seed_if_empty()
    items = db.scan_table(TABLE)
    return sorted(items, key=lambda x: x.get("start_date", ""), reverse=True)


# ── Admin ─────────────────────────────────────────────────────────────────────

@router.post("", response_model=ExperienceResponse, status_code=201)
def create_experience(body: ExperienceCreate, _: dict = Depends(require_admin)):
    """Create an experience entry (admin only)."""
    item = {
        "id": str(uuid.uuid4()),
        "letter_url": None,
        "logo_url": None,
        "created_at": datetime.utcnow().isoformat(),
        **body.model_dump(),
    }
    return db.put_item(TABLE, item)


@router.put("/{exp_id}", response_model=ExperienceResponse)
def update_experience(exp_id: str, body: ExperienceCreate, _: dict = Depends(require_admin)):
    """Update an experience entry (admin only)."""
    if not db.get_item(TABLE, {"id": exp_id}):
        raise HTTPException(status_code=404, detail="Experience not found")
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    return db.update_item(TABLE, {"id": exp_id}, updates)


@router.delete("/{exp_id}", status_code=204)
def delete_experience(exp_id: str, _: dict = Depends(require_admin)):
    """Delete an experience entry (admin only)."""
    item = db.get_item(TABLE, {"id": exp_id})
    if not item:
        raise HTTPException(status_code=404, detail="Experience not found")
    for field in ("letter_url", "logo_url"):
        if item.get(field):
            key = s3.key_from_url(item[field])
            if key:
                s3.delete_file(key)
    db.delete_item(TABLE, {"id": exp_id})


@router.post("/{exp_id}/letter", response_model=ExperienceResponse)
async def upload_letter(
    exp_id: str,
    file: UploadFile = File(...),
    _: dict = Depends(require_admin),
):
    """Upload internship letter image to S3 (admin only)."""
    item = db.get_item(TABLE, {"id": exp_id})
    if not item:
        raise HTTPException(status_code=404, detail="Experience not found")
    if item.get("letter_url"):
        key = s3.key_from_url(item["letter_url"])
        if key:
            s3.delete_file(key)
    content = await file.read()
    url = s3.upload_file(
        content, file.filename or "letter.jpg", "experience/", file.content_type or "image/jpeg"
    )
    return db.update_item(TABLE, {"id": exp_id}, {"letter_url": url})


@router.post("/{exp_id}/logo", response_model=ExperienceResponse)
async def upload_logo(
    exp_id: str,
    file: UploadFile = File(...),
    _: dict = Depends(require_admin),
):
    """Upload company logo to S3 (admin only)."""
    item = db.get_item(TABLE, {"id": exp_id})
    if not item:
        raise HTTPException(status_code=404, detail="Experience not found")
    if item.get("logo_url"):
        key = s3.key_from_url(item["logo_url"])
        if key:
            s3.delete_file(key)
    content = await file.read()
    url = s3.upload_file(
        content, file.filename or "logo.png", "experience/", file.content_type or "image/png"
    )
    return db.update_item(TABLE, {"id": exp_id}, {"logo_url": url})
