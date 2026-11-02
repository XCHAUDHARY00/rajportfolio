import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from app.routers import (
    achievements,
    auth,
    certifications,
    contact,
    experience,
    profile,
    projects,
    skills,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s  %(message)s",
)

app = FastAPI(
    title="Raj Chaudhary Portfolio API",
    description=(
        "Backend API for Raj Chaudhary's portfolio website. "
        "Public endpoints expose profile, projects, skills, experience, "
        "certifications, and achievements. Admin endpoints (JWT-protected) "
        "allow full CRUD and file uploads."
    ),
    version="1.0.0",
    contact={
        "name": "Raj Chaudhary",
        "email": "dhariwalraj37@gmail.com",
        "url": "https://github.com/XCHAUDHARY00",
    },
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pathlib import Path
from fastapi.staticfiles import StaticFiles

_uploads_dir = Path(__file__).resolve().parent.parent / "uploads"
_uploads_dir.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(_uploads_dir)), name="uploads")

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(experience.router)
app.include_router(certifications.router)
app.include_router(achievements.router)
app.include_router(contact.router)


@app.get("/", tags=["health"])
def root():
    return {"status": "ok", "service": "Raj Chaudhary Portfolio API", "version": "1.0.0"}


@app.get("/health", tags=["health"])
def health():
    return {"status": "healthy"}


# ── AWS Lambda handler (via Mangum) ───────────────────────────────────────────
handler = Mangum(app, lifespan="off")
