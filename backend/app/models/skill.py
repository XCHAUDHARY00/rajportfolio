from pydantic import BaseModel


class SkillCreate(BaseModel):
    name: str
    category: str  # Programming / Backend / Frontend / DevOps / AI / Tools


class SkillResponse(SkillCreate):
    id: str
