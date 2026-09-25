# AI Resume Analyser

## What is included
- Flask backend
- HTML/CSS/JavaScript frontend
- PDF, DOCX and TXT resume text extraction
- Basic ATS-style score
- Skill extraction
- Job-description skill matching
- One-click Windows START.bat

## Python
Designed for Python 3.14. The project uses only lightweight packages listed in `backend/requirements.txt`.

## Easiest way
1. Install Python 3.14 from python.org and make sure Python is added to PATH.
2. Extract this ZIP.
3. Open the folder in VS Code.
4. Double-click `START.bat`.
5. The browser opens automatically at http://127.0.0.1:5000

You do NOT need to manually run pip install or start the Flask server.

## VS Code Live Server
Do not use the VS Code Live Server extension for this project. The Flask server serves the frontend and API from the same address, so frontend/backend are already connected.

## Features
Upload a resume -> Analyse Resume.
Then paste a job description -> Check Job Match.

Note: This is a practical mini-project/demo analyser, not a production ATS or a connection to private recruiter databases.
