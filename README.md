This project is built using **React** and **FastAPI (Backend)**.
It demonstrates frontend UI development along with backend API integration.

## Tech Stack

- Frontend: React, JavaScript
- Backend: FastAPI, Python
- Tools: npm, uvicorn

### Clone the Repository

```
git clone <your-repo-link>
cd <project-folder>
```

---

## Frontend Setup

```
cd frontend
npm install
npm start
```

Runs on: http://localhost:3000

---

## Backend Setup

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn
python3 -m uvicorn main:app --reload
```

## Notes

- Backend uses FastAPI with Uvicorn server
