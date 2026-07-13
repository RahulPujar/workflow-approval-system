from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine, SessionLocal
from models import User
from routes import router

app = FastAPI(
    title="Workflow Approval API",
    version="1.0"
)

Base.metadata.create_all(bind=engine)

db = SessionLocal()

if db.query(User).count() == 0:

    db.add_all([
        User(
            username="admin",
            password="admin123",
            role="Admin"
        ),
        User(
            username="employee",
            password="emp123",
            role="Employee"
        ),
        User(
            username="manager",
            password="mgr123",
            role="Manager"
        )
    ])

    db.commit()

db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
