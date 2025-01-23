from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
import os
import models
from dotenv import load_dotenv
import models
from PIL import Image
import io
from fastapi.responses import StreamingResponse

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

# 画像保存
def add_image(email: str, data: bytes, session: Session):
    user_obj = models.Image(email=email, data=data)
    session.add(user_obj)
    session.commit()
    session.refresh(user_obj)

    return

# 画像表示
def get_images(id: int, session: Session):
    user_obj = session.query(models.Image).filter_by(id=id).first()

    if user_obj:
        return StreamingResponse(io.BytesIO(user_obj.data), media_type="image/png")
        
    return {f"Image with ID {id} not found."}
