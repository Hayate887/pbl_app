import uuid
from sqlalchemy import UUID, Column, Integer, LargeBinary, String
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass

class Image(Base):
    __tablename__ = "img"

    id = Column("id", Integer, primary_key=True, index=True)
    email = Column("email", String(100))
    data = Column("data", LargeBinary)

