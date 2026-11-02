import uuid
from typing import Dict, List

from fastapi import APIRouter, Depends, HTTPException

from app.middleware.auth import require_admin
from app.models.skill import SkillCreate, SkillResponse
from app.services import dynamodb as db

router = APIRouter(prefix="/api/skills", tags=["skills"])

TABLE = "skills"

_SEED_SKILLS = [
    # Programming Languages
    {"name": "Python", "category": "Programming"},
    {"name": "C++", "category": "Programming"},
    {"name": "JavaScript", "category": "Programming"},
    {"name": "SQL", "category": "Programming"},
    # Backend
    {"name": "Django", "category": "Backend"},
    {"name": "Django REST Framework", "category": "Backend"},
    {"name": "FastAPI", "category": "Backend"},
    {"name": "PostgreSQL", "category": "Backend"},
    {"name": "REST API Design", "category": "Backend"},
    {"name": "JWT Authentication", "category": "Backend"},
    # Frontend
    {"name": "React.js", "category": "Frontend"},
    {"name": "Tailwind CSS", "category": "Frontend"},
    {"name": "HTML5", "category": "Frontend"},
    {"name": "CSS3", "category": "Frontend"},
    # DevOps & Cloud
    {"name": "Docker", "category": "DevOps"},
    {"name": "AWS EC2", "category": "DevOps"},
    {"name": "AWS Lambda", "category": "DevOps"},
    {"name": "AWS DynamoDB", "category": "DevOps"},
    {"name": "AWS S3", "category": "DevOps"},
    {"name": "AWS SES", "category": "DevOps"},
    {"name": "CI/CD (GitHub Actions)", "category": "DevOps"},
    {"name": "Vercel", "category": "DevOps"},
    # AI / APIs
    {"name": "Google Gemini AI", "category": "AI"},
    {"name": "Gemini Vision API", "category": "AI"},
    {"name": "PyPDF2", "category": "AI"},
    {"name": "GitHub REST API", "category": "AI"},
    {"name": "Firebase Auth & Firestore", "category": "AI"},
    # Tools
    {"name": "Git", "category": "Tools"},
    {"name": "GitHub", "category": "Tools"},
    {"name": "Postman", "category": "Tools"},
    {"name": "Linux", "category": "Tools"},
]


def _seed_if_empty():
    items = db.scan_table(TABLE)
    if not items:
        for skill in _SEED_SKILLS:
            db.put_item(TABLE, {"id": str(uuid.uuid4()), **skill})


# ── Public ────────────────────────────────────────────────────────────────────

@router.get("", response_model=List[SkillResponse])
def list_skills():
    """List all skills (public)."""
    _seed_if_empty()
    items = db.scan_table(TABLE)
    return items


# ── Admin ─────────────────────────────────────────────────────────────────────

@router.post("", response_model=SkillResponse, status_code=201)
def create_skill(body: SkillCreate, _: dict = Depends(require_admin)):
    """Create a skill (admin only)."""
    item = {"id": str(uuid.uuid4()), **body.model_dump()}
    return db.put_item(TABLE, item)


@router.post("/bulk", response_model=List[SkillResponse], status_code=201)
def bulk_create_skills(body: List[SkillCreate], _: dict = Depends(require_admin)):
    """Bulk-create skills (admin only)."""
    created = []
    for skill in body:
        item = {"id": str(uuid.uuid4()), **skill.model_dump()}
        db.put_item(TABLE, item)
        created.append(item)
    return created


@router.put("/{skill_id}", response_model=SkillResponse)
def update_skill(skill_id: str, body: SkillCreate, _: dict = Depends(require_admin)):
    """Update a skill (admin only)."""
    if not db.get_item(TABLE, {"id": skill_id}):
        raise HTTPException(status_code=404, detail="Skill not found")
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    return db.update_item(TABLE, {"id": skill_id}, updates)


@router.delete("/{skill_id}", status_code=204)
def delete_skill(skill_id: str, _: dict = Depends(require_admin)):
    """Delete a skill (admin only)."""
    if not db.get_item(TABLE, {"id": skill_id}):
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete_item(TABLE, {"id": skill_id})
