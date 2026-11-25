from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine

DATABASE_URL = "sqlite:///jobs.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def create_db() -> None:
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]