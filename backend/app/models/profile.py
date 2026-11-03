from typing import Optional
from pydantic import BaseModel


class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    bio: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    leetcode: Optional[str] = None
    website: Optional[str] = None
    cgpa: Optional[float] = None
    available_for_work: Optional[bool] = None

    # Hero Customizations
    hero_role: Optional[str] = None
    hero_status: Optional[str] = None
    hero_headline: Optional[str] = None
    hero_subtext: Optional[str] = None
    hero_roles_list: Optional[str] = None
    doors_config: Optional[str] = None

    # About 4 Stats Cards
    stat1_value: Optional[str] = None
    stat1_label: Optional[str] = None
    stat1_sub: Optional[str] = None

    stat2_value: Optional[str] = None
    stat2_label: Optional[str] = None
    stat2_sub: Optional[str] = None

    stat3_value: Optional[str] = None
    stat3_label: Optional[str] = None
    stat3_sub: Optional[str] = None

    stat4_value: Optional[str] = None
    stat4_label: Optional[str] = None
    stat4_sub: Optional[str] = None

    # Education Card
    edu_degree: Optional[str] = None
    edu_college: Optional[str] = None
    edu_location: Optional[str] = None
    edu_class12: Optional[str] = None
    edu_class10: Optional[str] = None

    # About Editorial Details
    about_tag: Optional[str] = None
    about_headline: Optional[str] = None
    about_quote: Optional[str] = None


class ProfileResponse(BaseModel):
    name: str = "Raj Chaudhary"
    title: str = "Backend Developer | Python | Django | REST API | PostgreSQL"
    bio: str = ""
    email: str = "dhariwalraj37@gmail.com"
    phone: str = "7300706640"
    location: str = "Ghaziabad, UP"
    github: str = ""
    linkedin: str = ""
    leetcode: str = ""
    website: str = ""
    cgpa: float = 7.86
    available_for_work: bool = True
    profile_photo_url: Optional[str] = None
    photo_url: Optional[str] = None
    resume_url: Optional[str] = None

    # Hero Customizations
    hero_role: Optional[str] = "BACKEND DEVELOPER •"
    hero_status: Optional[str] = "Open to SDE & Backend roles"
    hero_headline: Optional[str] = "I build\nthoughtful backend\nsystems, from\nREST APIs to\ncloud scale."
    hero_subtext: Optional[str] = "Passionate about high-throughput Python backends, distributed systems, and production cloud infrastructure. Third-year CSIT at AKGEC (CGPA 7.86)."
    hero_roles_list: Optional[str] = "Backend Developer, Python & Django Specialist, REST API Architect, Distributed Systems Engineer, Cloud & DevOps Practitioner, PostgreSQL & DynamoDB Specialist"
    doors_config: Optional[str] = "backend,systems,cloud,fullstack"

    # About 4 Stats Cards
    stat1_value: Optional[str] = "7.86"
    stat1_label: Optional[str] = "CGPA"
    stat1_sub: Optional[str] = "AKGEC CSIT"

    stat2_value: Optional[str] = "2+"
    stat2_label: Optional[str] = "PROJECTS"
    stat2_sub: Optional[str] = "Production Grade"

    stat3_value: Optional[str] = "150+"
    stat3_label: Optional[str] = "DSA PRACTICE"
    stat3_sub: Optional[str] = "LeetCode & Beyond"

    stat4_value: Optional[str] = "4+"
    stat4_label: Optional[str] = "CERTS & WINS"
    stat4_sub: Optional[str] = "JPMorgan & Honors"

    # Education Card
    edu_degree: Optional[str] = "B.Tech — Computer Science & IT (CS & IT)"
    edu_college: Optional[str] = "Ajay Kumar Garg Engineering College (2024 – 2028)"
    edu_location: Optional[str] = "Ghaziabad, UP"
    edu_class12: Optional[str] = "Class 12 (PCM): 89.66% — LFAIC Inter College, Sambhal (2024)"
    edu_class10: Optional[str] = "Class 10: 86.00% — LFAIC Inter College, Sambhal (2022)"

    # About Editorial Details
    about_tag: Optional[str] = "ABOUT MY BACKGROUND"
    about_headline: Optional[str] = "Engineering scalable systems with intent & speed."
    about_quote: Optional[str] = "Writing clean backend code isn't just about making it work — it's about building architectures that gracefully handle scale, failures, and time."
