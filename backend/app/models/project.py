from typing import List, Optional
from pydantic import BaseModel, Field


class ProjectCreate(BaseModel):
    title: str
    description: str
    category: Optional[str] = "web"
    stack: List[str] = []
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    start_date: str = ""
    end_date: Optional[str] = None
    featured: bool = False
    bullets: List[str] = []
    images: List[str] = Field(default_factory=list)


class ProjectResponse(ProjectCreate):
    id: str
    category: Optional[str] = "web"
    image_url: Optional[str] = None
    images: List[str] = Field(default_factory=list)
    created_at: str
