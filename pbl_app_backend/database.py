from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
import os
import models
from dotenv import load_dotenv
import models

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("SQLALCHEMY_DATABASE_URL")
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=True, bind=engine)


def get_db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

def add_image(email: str, data: bytes, session: Session):
    user_obj = models.Image(email=email, data=data)
    session.add(user_obj)
    session.commit()
    session.refresh(user_obj)

    return
