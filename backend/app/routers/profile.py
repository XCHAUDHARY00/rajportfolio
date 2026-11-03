from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

from app.middleware.auth import require_admin
from app.models.profile import ProfileResponse, ProfileUpdate
from app.services import dynamodb as db
from app.services import s3

router = APIRouter(prefix="/api/profile", tags=["profile"])

TABLE = "profile"
PROFILE_KEY = {"pk": "RAJ_PROFILE"}

_DEFAULT_PROFILE = {
    "pk": "RAJ_PROFILE",
    "name": "Raj Chaudhary",
    "title": "Backend Developer | Python | Django | REST API | PostgreSQL",
    "bio": (
        "Passionate Backend Developer and third-year B.Tech CSIT student at Ajay Kumar Garg "
        "Engineering College (CGPA: 7.86) with a strong foundation in building scalable, "
        "production-grade systems. Specialize in Python, Django, DRF, and RESTful APIs, "
        "integrating AI (Google Gemini), and shipping full-stack applications to production."
    ),
    "email": "dhariwalraj37@gmail.com",
    "phone": "7300706640",
    "location": "Ghaziabad, UP",
    "github": "https://github.com/XCHAUDHARY00",
    "linkedin": "https://linkedin.com/in/rajchaudhary",
    "leetcode": "https://leetcode.com/u/RAJDHARIWAL",
    "website": "https://rajchaudhary.me",
    "cgpa": 7.86,
    "available_for_work": True,
    "profile_photo_url": None,
    "photo_url": None,
    "resume_url": None,
    # Hero Customizations
    "hero_role": "BACKEND DEVELOPER •",
    "hero_status": "Open to SDE & Backend roles",
    "hero_headline": "I build\nthoughtful backend\nsystems, from\nREST APIs to\ncloud scale.",
    "hero_subtext": "Passionate about high-throughput Python backends, distributed systems, and production cloud infrastructure. Third-year CSIT at AKGEC (CGPA 7.86).",
    "hero_roles_list": "Backend Developer, Python & Django Specialist, REST API Architect, Distributed Systems Engineer, Cloud & DevOps Practitioner, PostgreSQL & DynamoDB Specialist",
    "doors_config": "backend,systems,cloud,fullstack",
    # About 4 Stats Cards
    "stat1_value": "7.86",
    "stat1_label": "CGPA",
    "stat1_sub": "AKGEC CSIT",
    "stat2_value": "2+",
    "stat2_label": "PROJECTS",
    "stat2_sub": "Production Grade",
    "stat3_value": "150+",
    "stat3_label": "DSA PRACTICE",
    "stat3_sub": "LeetCode & Beyond",
    "stat4_value": "4+",
    "stat4_label": "CERTS & WINS",
    "stat4_sub": "JPMorgan & Honors",
    # Education Card
    "edu_degree": "B.Tech — Computer Science & IT",
    "edu_college": "Ajay Kumar Garg Engineering College (2024 – 2028)",
    "edu_location": "Ghaziabad, UP",
    "edu_class12": "Class 12: 89.66%",
    # About Editorial Details
    "about_tag": "ABOUT MY BACKGROUND",
    "about_headline": "Engineering scalable systems with intent & speed.",
    "about_quote": "Writing clean backend code isn't just about making it work — it's about building architectures that gracefully handle scale, failures, and time.",
    "created_at": datetime.utcnow().isoformat(),
}


def _ensure_seeded() -> dict:
    """Return the profile document, seeding it on first access and backfilling missing keys."""
    item = db.get_item(TABLE, PROFILE_KEY)
    if item is None:
        db.put_item(TABLE, _DEFAULT_PROFILE)
        item = dict(_DEFAULT_PROFILE)
    else:
        merged = dict(_DEFAULT_PROFILE)
        merged.update(item)
        if "photo_url" not in merged or not merged.get("photo_url"):
            merged["photo_url"] = merged.get("profile_photo_url")
        item = merged
    return item


# ── Public ──────────────────────────────────────────────────────────────────

@router.get("", response_model=ProfileResponse)
def get_profile():
    """Return Raj's public profile."""
    return _ensure_seeded()


# ── Admin ────────────────────────────────────────────────────────────────────

@router.put("", response_model=ProfileResponse)
def update_profile(body: ProfileUpdate, _: dict = Depends(require_admin)):
    """Update profile fields (admin only)."""
    _ensure_seeded()
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    db.update_item(TABLE, PROFILE_KEY, updates)
    return _ensure_seeded()


@router.post("/photo", response_model=ProfileResponse)
async def upload_profile_photo(
    file: UploadFile = File(...),
    _: dict = Depends(require_admin),
):
    """Upload a new profile photo to S3 (admin only)."""
    _ensure_seeded()
    content = await file.read()
    url = s3.upload_file(content, file.filename or "photo.jpg", "profile/", file.content_type or "image/jpeg")
    db.update_item(TABLE, PROFILE_KEY, {"profile_photo_url": url, "photo_url": url})
    return _ensure_seeded()


@router.delete("/photo", response_model=ProfileResponse)
def delete_profile_photo(_: dict = Depends(require_admin)):
    """Remove profile photo from S3 and clear the URL (admin only)."""
    profile = _ensure_seeded()
    old_url = profile.get("profile_photo_url")
    if old_url:
        key = s3.key_from_url(old_url)
        if key:
            s3.delete_file(key)
    db.update_item(TABLE, PROFILE_KEY, {"profile_photo_url": None, "photo_url": None})
    return _ensure_seeded()


@router.post("/resume", response_model=ProfileResponse)
async def upload_resume(
    file: UploadFile = File(...),
    _: dict = Depends(require_admin),
):
    """Upload a new resume PDF to S3 (admin only)."""
    _ensure_seeded()
    if not (file.filename or "").lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Resume must be a PDF file")
    content = await file.read()
    url = s3.upload_file(content, file.filename or "resume.pdf", "resume/", "application/pdf")
    db.update_item(TABLE, PROFILE_KEY, {"resume_url": url})
    return _ensure_seeded()


@router.delete("/resume", response_model=ProfileResponse)
def delete_resume(_: dict = Depends(require_admin)):
    """Remove resume PDF from S3 and clear the URL (admin only)."""
    profile = _ensure_seeded()
    old_url = profile.get("resume_url")
    if old_url:
        key = s3.key_from_url(old_url)
        if key:
            s3.delete_file(key)
    db.update_item(TABLE, PROFILE_KEY, {"resume_url": None})
    return _ensure_seeded()
