from typing import Optional
from pydantic import BaseModel


class AchievementCreate(BaseModel):
    title: str
    description: str
    date: str
    category: Optional[str] = None


class AchievementResponse(AchievementCreate):
    id: str
    created_at: str
