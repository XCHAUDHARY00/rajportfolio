from typing import List, Optional
from pydantic import BaseModel, Field, field_validator


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

    @field_validator("stack", mode="before")
    @classmethod
    def parse_stack(cls, v):
        if isinstance(v, str):
            return [s.strip() for s in v.split(",") if s.strip()]
        if isinstance(v, list):
            return [str(s).strip() for s in v if str(s).strip()]
        return []

    @field_validator("bullets", mode="before")
    @classmethod
    def parse_bullets(cls, v):
        if isinstance(v, str):
            return [s.strip() for s in v.split("\n") if s.strip()]
        if isinstance(v, list):
            return [str(s).strip() for s in v if str(s).strip()]
        return []


class ProjectResponse(ProjectCreate):
    id: str
    category: Optional[str] = "web"
    image_url: Optional[str] = None
    images: List[str] = Field(default_factory=list)
    created_at: str
