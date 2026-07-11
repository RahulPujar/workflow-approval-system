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

## 📸 Application Screenshots

### 🔐 Employee Login

![Employee Login](screenshots/Emp%20login.png)

---

### 📊 Employee Dashboard

![Employee Dashboard](screenshots/emp%20dashboard.png)

---

### ➕ Create Request

![Create Request](screenshots/create%20request.png)

---

### 📋 Request Created Successfully

![Request Created](screenshots/Request%20c%20reated.png)

---

### 📈 Request Status

![Request Status](screenshots/Request%20status.png)

---

### 🔐 Manager Login

![Manager Login](screenshots/Mgr%20login.png)

---

### 📊 Manager Dashboard

![Manager Dashboard](screenshots/Mgr%20dashboard.png)

---

### ✅ Pending Approvals

![Pending Approvals](screenshots/Pending%20approvals.png)

---

### ✔️ Request Approved

![Request Approved](screenshots/Request%20approved.png)

---

### 🔐 Admin Login

![Admin Login](screenshots/Admin%20login.png)

---

### 📊 Admin Dashboard

![Admin Dashboard](screenshots/Admin%20dashboard.png)
---

## 🔐 Authentication & Authorization

The application implements secure authentication and role-based access control using JSON Web Tokens (JWT).

### Authentication
- User login with username and password
- JWT access token generation after successful login
- Token stored in browser local storage
- Token included in the `Authorization` header for protected API requests

### Authorization
The system enforces role-based access control (RBAC):

- **Employee**
  - Create workflow requests
  - View personal requests and their status

- **Manager**
  - View pending requests
  - Approve or reject employee requests
  - Access manager dashboard

- **Admin**
  - Access administrative dashboard

### Security Features
- Protected API endpoints
- JWT token verification for every authenticated request
- Role-based page navigation
- Unauthorized users are redirected to the appropriate page
- Session cleared on logout by removing stored authentication data
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
