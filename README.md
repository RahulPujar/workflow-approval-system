# 📋 Workflow Approval System

A role-based Workflow Approval System built using **FastAPI**, **SQLite**, **HTML**, **CSS**, and **JavaScript**. This application allows employees to submit requests and managers to review, approve, or reject them through a simple and intuitive interface.

---

## 🚀 Features

### 👨‍💼 Employee
- Secure login
- Create workflow requests
- View submitted requests
- Track request status (Pending / Approved / Rejected)

### 👨‍💻 Manager
- Secure login
- View pending requests
- Approve requests
- Reject requests
- Dashboard with request statistics

### 👨‍💼 Admin
- Secure login
- Dashboard access

---

## 🛠️ Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Uvicorn

### Frontend
- HTML5
- CSS3
- JavaScript

---

## 📂 Project Structure

```
workflow-app/
│
├── backend/
│   ├── auth.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── routes.py
│   ├── requirements.txt
│   └── workflow.db
│
├── frontend/
│   ├── Css/
│   ├── js/
│   ├── login.html
│   ├── dashboard.html
│   ├── create.html
│   ├── requests.html
│   └── approvals.html
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/RahulPujar/workflow-approval-system.git
```

### 2. Navigate to the project

```bash
cd workflow-approval-system
```

### 3. Create virtual environment

```bash
python -m venv venv
```

### 4. Activate virtual environment

**Windows PowerShell**

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

### 5. Install dependencies

```bash
pip install -r backend/requirements.txt
```

### 6. Run the backend

```bash
cd backend
uvicorn main:app --reload
```

Backend will start at:

```
http://127.0.0.1:8000
```

### 7. Open the frontend

Open:

```
frontend/login.html
```

in your web browser.

---

## 👤 Demo Credentials

### Employee

| Username | Password |
|----------|----------|
| employee | employee123 |

### Manager

| Username | Password |
|----------|----------|
| manager | manager123 |

### Admin

| Username | Password |
|----------|----------|
| admin | admin123 |

---

## 📸 Screenshots

### Login

*(Add login screenshot here)*

---

### Employee Dashboard

*(Add employee dashboard screenshot here)*

---

### Create Request

*(Add create request screenshot here)*

---

### My Requests

*(Add my requests screenshot here)*

---

### Manager Dashboard

*(Add manager dashboard screenshot here)*

---

### Pending Approvals

*(Add pending approvals screenshot here)*

---

### Admin Dashboard

*(Add admin dashboard screenshot here)*

---

## 🔐 Authentication

- JWT-based authentication
- Role-based authorization
- Protected API endpoints
- Secure login system

---

## 📌 Future Enhancements

- Email notifications
- Request comments
- File attachments
- Search and filtering
- Audit logs
- Responsive mobile interface

---

## 👨‍💻 Author

**Rahul Pujar**
