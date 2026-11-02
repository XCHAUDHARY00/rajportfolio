import uuid
from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException

from app.middleware.auth import require_admin
from app.models.achievement import AchievementCreate, AchievementResponse
from app.services import dynamodb as db

router = APIRouter(prefix="/api/achievements", tags=["achievements"])

TABLE = "achievements"

_SEED_ACHIEVEMENTS = [
    {
        "id": "ach-001",
        "title": "Hacknovate Hackathon Finalist",
        "description": (
            "Participated and advanced as a finalist in Hacknovate, the annual "
            "hackathon organized at Ajay Kumar Garg Engineering College, "
            "competing against 200+ teams."
        ),
        "date": "2025-03",
        "category": "Hackathon",
        "created_at": datetime.utcnow().isoformat(),
    },
]


def _seed_if_empty():
    items = db.scan_table(TABLE)
    if not items:
        for ach in _SEED_ACHIEVEMENTS:
            db.put_item(TABLE, ach)


# ── Public ────────────────────────────────────────────────────────────────────

@router.get("", response_model=List[AchievementResponse])
def list_achievements():
    """List all achievements (public)."""
    _seed_if_empty()
    items = db.scan_table(TABLE)
    return sorted(items, key=lambda x: x.get("date", ""), reverse=True)


# ── Admin ─────────────────────────────────────────────────────────────────────

@router.post("", response_model=AchievementResponse, status_code=201)
def create_achievement(body: AchievementCreate, _: dict = Depends(require_admin)):
    """Create an achievement (admin only)."""
    item = {
        "id": str(uuid.uuid4()),
        "created_at": datetime.utcnow().isoformat(),
        **body.model_dump(),
    }
    return db.put_item(TABLE, item)


@router.put("/{ach_id}", response_model=AchievementResponse)
def update_achievement(ach_id: str, body: AchievementCreate, _: dict = Depends(require_admin)):
    """Update an achievement (admin only)."""
    if not db.get_item(TABLE, {"id": ach_id}):
        raise HTTPException(status_code=404, detail="Achievement not found")
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    return db.update_item(TABLE, {"id": ach_id}, updates)


@router.delete("/{ach_id}", status_code=204)
def delete_achievement(ach_id: str, _: dict = Depends(require_admin)):
    """Delete an achievement (admin only)."""
    if not db.get_item(TABLE, {"id": ach_id}):
        raise HTTPException(status_code=404, detail="Achievement not found")
    db.delete_item(TABLE, {"id": ach_id})
