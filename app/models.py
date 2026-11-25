from datetime import date
from enum import Enum
from typing import Optional

from sqlmodel import Field, SQLModel


class Status(str, Enum):
    applied = "applied"
    interviewing = "interviewing"
    offer = "offer"
    rejected = "rejected"

class JobBase(SQLModel):
    company: str
    role: str
    status: Status = Status.applied
    applied_date: date = Field(default_factory=date.today)

class Job(JobBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class JobCreate(JobBase):
    pass

class JobUpdate(SQLModel):
    status: Optional[Status] = None