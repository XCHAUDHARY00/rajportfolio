import uuid
from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile

from app.middleware.auth import require_admin
from app.models.project import ProjectCreate, ProjectResponse
from app.services import dynamodb as db
from app.services import s3

router = APIRouter(prefix="/api/projects", tags=["projects"])

TABLE = "projects"

_SEED_PROJECTS = [
    {
        "id": "proj-001",
        "title": "SkillForge AI — Full-Stack AI Career Operating System",
        "description": (
            "An AI-powered career platform featuring ATS resume analysis, mock interview simulation "
            "with Gemini AI, and personalized skill-gap roadmaps with intelligent caching."
        ),
        "stack": ["Python", "Django 5", "DRF", "PostgreSQL", "React 18", "Tailwind CSS", "Google Gemini AI", "PyPDF2", "JWT", "GitHub REST API"],
        "github_url": "https://github.com/XCHAUDHARY00",
        "live_url": None,
        "start_date": "2026-01",
        "end_date": "2026-04",
        "featured": True,
        "bullets": [
            "Engineered an AI-powered resume analyser using PyPDF2 and Google Gemini AI delivering real-time ATS readiness scores with prioritised improvement recommendations.",
            "Built a mock interview simulator powered by Gemini AI generating role-specific technical questions and evaluating responses with structured rubric-based feedback.",
            "Designed a skill-gap analysis engine cross-referencing user competencies against target job requirements to auto-generate personalised 4-week learning roadmaps.",
            "Implemented multi-layer caching strategy (Django cache framework) for Gemini AI responses, skill-gap results, and GitHub data — reducing redundant API calls by 60%+.",
            "Built an AI fallback system that gracefully degrades to pre-computed heuristic responses and cached results when Gemini is rate-limited, ensuring zero user-facing downtime.",
            "Architected scalable Django 5 + DRF backend with JWT authentication and silent token refresh, paired with responsive React 18 + Tailwind CSS frontend.",
        ],
        "image_url": None,
        "images": [],
        "created_at": datetime.utcnow().isoformat(),
    },
    {
        "id": "proj-002",
        "title": "E-Commerce Full-Stack Web Application",
        "description": (
            "A production-grade full-stack e-commerce platform with a DRF + PostgreSQL backend "
            "and React (Vite) + Tailwind CSS frontend delivering end-to-end shopping and order management."
        ),
        "stack": ["Django", "DRF", "PostgreSQL", "React.js", "Vite", "Tailwind CSS"],
        "github_url": "https://github.com/XCHAUDHARY00",
        "live_url": None,
        "start_date": "2025-08",
        "end_date": "2025-12",
        "featured": True,
        "bullets": [
            "Built and deployed a production-grade full-stack e-commerce platform with DRF + PostgreSQL backend and React (Vite) + Tailwind CSS frontend.",
            "Implemented end-to-end user authentication, dynamic product catalogue, shopping cart, and order management using a clean, decoupled API-client architecture.",
        ],
        "image_url": None,
        "images": [],
        "created_at": datetime.utcnow().isoformat(),
    },
]


def _normalize_item(item: dict) -> dict:
    if not item:
        return item
    if "images" not in item or not item["images"]:
        item["images"] = [item["image_url"]] if item.get("image_url") else []
    elif not item.get("image_url") and item.get("images"):
        item["image_url"] = item["images"][0]
    return item


def _seed_if_empty():
    items = db.scan_table(TABLE)
    if not items:
        for p in _SEED_PROJECTS:
            db.put_item(TABLE, p)


# ── Public ────────────────────────────────────────────────────────────────────

@router.get("", response_model=List[ProjectResponse])
def list_projects():
    """List all projects sorted newest first (public)."""
    _seed_if_empty()
    items = db.scan_table(TABLE)
    normalized = [_normalize_item(it) for it in items]
    return sorted(normalized, key=lambda x: x.get("start_date", ""), reverse=True)


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str):
    """Get a single project by ID (public)."""
    _seed_if_empty()
    item = db.get_item(TABLE, {"id": project_id})
    if not item:
        raise HTTPException(status_code=404, detail="Project not found")
    return _normalize_item(item)


# ── Admin ─────────────────────────────────────────────────────────────────────

@router.post("", response_model=ProjectResponse, status_code=201)
def create_project(body: ProjectCreate, _: dict = Depends(require_admin)):
    """Create a new project (admin only)."""
    data = body.model_dump()
    images = data.get("images") or []
    image_url = images[0] if images else None
    item = {
        "id": str(uuid.uuid4()),
        "image_url": image_url,
        "images": images,
        "created_at": datetime.utcnow().isoformat(),
        **data,
    }
    return db.put_item(TABLE, item)


@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: str, body: ProjectCreate, _: dict = Depends(require_admin)):
    """Update a project (admin only)."""
    existing = db.get_item(TABLE, {"id": project_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    if "images" in updates and updates["images"]:
        updates["image_url"] = updates["images"][0]
    return _normalize_item(db.update_item(TABLE, {"id": project_id}, updates))


@router.delete("/{project_id}", status_code=204)
def delete_project(project_id: str, _: dict = Depends(require_admin)):
    """Delete a project (admin only)."""
    item = db.get_item(TABLE, {"id": project_id})
    if not item:
        raise HTTPException(status_code=404, detail="Project not found")
    all_imgs = item.get("images") or []
    if item.get("image_url") and item["image_url"] not in all_imgs:
        all_imgs.append(item["image_url"])
    for url in all_imgs:
        key = s3.key_from_url(url)
        if key:
            s3.delete_file(key)
    db.delete_item(TABLE, {"id": project_id})


@router.post("/{project_id}/image", response_model=ProjectResponse)
async def upload_project_image(
    project_id: str,
    file: UploadFile = File(...),
    _: dict = Depends(require_admin),
):
    """Upload a single project image and add to images list (admin only)."""
    item = db.get_item(TABLE, {"id": project_id})
    if not item:
        raise HTTPException(status_code=404, detail="Project not found")
    content = await file.read()
    url = s3.upload_file(content, file.filename or "image.jpg", "projects/", file.content_type or "image/jpeg")
    images = item.get("images") or []
    if url not in images:
        images.append(url)
    updates = {"image_url": images[0], "images": images}
    return _normalize_item(db.update_item(TABLE, {"id": project_id}, updates))


@router.post("/{project_id}/images", response_model=ProjectResponse)
async def upload_multiple_project_images(
    project_id: str,
    files: List[UploadFile] = File(...),
    _: dict = Depends(require_admin),
):
    """Upload multiple project images (admin only)."""
    item = db.get_item(TABLE, {"id": project_id})
    if not item:
        raise HTTPException(status_code=404, detail="Project not found")
    images = list(item.get("images") or [])
    for file in files:
        content = await file.read()
        url = s3.upload_file(content, file.filename or "image.jpg", "projects/", file.content_type or "image/jpeg")
        images.append(url)
    updates = {"image_url": images[0] if images else None, "images": images}
    return _normalize_item(db.update_item(TABLE, {"id": project_id}, updates))


@router.delete("/{project_id}/images", response_model=ProjectResponse)
def delete_project_image(
    project_id: str,
    image_url: str = Query(...),
    _: dict = Depends(require_admin),
):
    """Delete a specific image from a project's images list (admin only)."""
    item = db.get_item(TABLE, {"id": project_id})
    if not item:
        raise HTTPException(status_code=404, detail="Project not found")
    images = [img for img in (item.get("images") or []) if img != image_url]
    key = s3.key_from_url(image_url)
    if key:
        s3.delete_file(key)
    updates = {
        "images": images,
        "image_url": images[0] if images else None,
    }
    return _normalize_item(db.update_item(TABLE, {"id": project_id}, updates))
