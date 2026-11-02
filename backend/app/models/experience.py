from typing import List, Optional
from pydantic import BaseModel


class ExperienceCreate(BaseModel):
    company: str
    role: str
    type: str  # Internship / Full-time / Part-time
    start_date: str
    end_date: Optional[str] = None
    currently_working: bool = False
    location: str
    description: str
    responsibilities: List[str] = []


class ExperienceResponse(ExperienceCreate):
    id: str
    letter_url: Optional[str] = None
    logo_url: Optional[str] = None
    created_at: str
