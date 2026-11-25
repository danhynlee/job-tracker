from fastapi import APIRouter, HTTPException
from sqlmodel import select

from app.database import SessionDep
from app.models import Job, JobCreate, JobUpdate, Status

router = APIRouter(prefix="/jobs", tags=["jobs"])

@router.post("", response_model=Job, status_code=201)
def create_job(job: JobCreate, session: SessionDep):
    db_job = Job.model_validate(job)
    session.add(db_job)
    session.commit()
    session.refresh(db_job)
    return db_job


@router.get("", response_model=list[Job])
def list_jobs(session:SessionDep, status: Status | None = None):
    query = select(Job)
    if status:
        query = query.where(Job.status == status)

    return session.exec(query).all()


@router.get("/{job_id}", response_model=Job)
def get_job(job_id: int, session: SessionDep):
    job = session.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.patch("/{job_id}", response_model=Job)
def update_job(job_id: int, update: JobUpdate, session: SessionDep):
    job = session.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    job.sqlmodel_update(update.model_dump(exclude_unset=True))
    session.add(job)
    session.commit()
    session.refresh(job)
    return job