from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from models import User, Request
from auth import create_access_token, verify_token

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

class RequestCreate(BaseModel):
    title: str
    description: str
    priority: str

@router.get("/")
def home():
    return {"message": "Workflow App Running"}


@router.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.username == data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if user.password != data.password:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = create_access_token(
        {
            "sub": user.username,
            "role": user.role
        }
    )

    return {
        "access_token": token,
        "role": user.role
    }
    
@router.post("/requests")
def create_request(
    request: RequestCreate,
    current_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):
    if current_user["role"] != "Employee":
        raise HTTPException(
            status_code=403,
            detail="Only Employees can create requests"
        )

    new_request = Request(
        title=request.title,
        description=request.description,
        priority=request.priority,
        status="Pending",
        created_by=current_user["sub"]
    )

    db.add(new_request)
    db.commit()
    db.refresh(new_request)

    return {
        "message": "Request Created Successfully",
        "id": new_request.id
    }


@router.get("/requests")
def get_requests(
    current_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    if current_user["role"] == "Employee":
        requests = db.query(Request).filter(
            Request.created_by == current_user["sub"]
        ).all()
    else:
        requests = db.query(Request).all()

    return requests


@router.get("/requests/{request_id}")
def get_request(
    request_id: int,
    current_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    request = db.query(Request).filter(
        Request.id == request_id
    ).first()

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Request not found"
        )

    if (
        current_user["role"] == "Employee"
        and request.created_by != current_user["sub"]
    ):
        raise HTTPException(
            status_code=403,
            detail="Access Denied"
        )

    return request

class RequestUpdate(BaseModel):
    title: str
    description: str
    priority: str


@router.put("/requests/{request_id}")
def update_request(
    request_id: int,
    updated_request: RequestUpdate,
    current_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    request = db.query(Request).filter(
        Request.id == request_id
    ).first()

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Request not found"
        )

    if (
        current_user["role"] == "Employee"
        and request.created_by != current_user["sub"]
    ):
        raise HTTPException(
            status_code=403,
            detail="You can update only your own requests"
        )
    
    if (
        current_user["role"] == "Employee"
        and request.status != "Pending"
    ):
        raise HTTPException(
            status_code=400,
            detail="Only Pending requests can be updated"
        )

    request.title = updated_request.title
    request.description = updated_request.description
    request.priority = updated_request.priority

    db.commit()

    return {
        "message": "Request Updated Successfully"
    }

@router.put("/approve/{request_id}")
def approve_request(
    request_id: int,
    current_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    if current_user["role"] != "Manager":
        raise HTTPException(
            status_code=403,
            detail="Only Manager can approve requests"
        )

    request = db.query(Request).filter(
        Request.id == request_id
    ).first()

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Request not found"
        )
    
    if request.status != "Pending":
        raise HTTPException(
            status_code=400,
            detail="Request already processed"
        )

    request.status = "Approved"

    db.commit()

    return {
        "message": "Request Approved Successfully"
    }

@router.put("/reject/{request_id}")
def reject_request(
    request_id: int,
    current_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    if current_user["role"] != "Manager":
        raise HTTPException(
            status_code=403,
            detail="Only Manager can reject requests"
        )

    request = db.query(Request).filter(
        Request.id == request_id
    ).first()

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Request not found"
        )
    
    if request.status != "Pending":
        raise HTTPException(
            status_code=400,
            detail="Request already processed"
        )

    request.status = "Rejected"

    db.commit()

    return {
        "message": "Request Rejected Successfully"
    }

@router.get("/dashboard")
def dashboard(
    current_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    if current_user["role"] == "Employee":
        query = db.query(Request).filter(
            Request.created_by == current_user["sub"]
        )
    else:
        query = db.query(Request)

    total = query.count()

    pending = query.filter(
        Request.status == "Pending"
    ).count()

    approved = query.filter(
        Request.status == "Approved"
    ).count()

    rejected = query.filter(
        Request.status == "Rejected"
    ).count()

    return {
        "username": current_user["sub"],
        "role": current_user["role"],
        "total_requests": total,
        "pending_requests": pending,
        "approved_requests": approved,
        "rejected_requests": rejected
    }