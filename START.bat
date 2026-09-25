@echo off
setlocal
cd /d "%~dp0"
title AI Resume Analyser - One Click Start
echo ==========================================
echo       AI RESUME ANALYSER - STARTING
echo ==========================================
where py >nul 2>&1
if %errorlevel%==0 (set PY=py) else (set PY=python)
%PY% --version
if errorlevel 1 (
 echo Python was not found. Install Python 3.14 and reopen this file.
 pause
 exit /b 1
)
if not exist ".venv\Scripts\python.exe" (
 echo Creating virtual environment...
 %PY% -m venv .venv
 if errorlevel 1 (
  echo Virtual environment creation failed.
  pause
  exit /b 1
 )
)
echo Installing required packages...
".venv\Scripts\python.exe" -m pip install --upgrade pip
".venv\Scripts\python.exe" -m pip install -r backend\requirements.txt
if errorlevel 1 (
 echo Package installation failed. Check your internet connection.
 pause
 exit /b 1
)
echo Starting server...
start "AI Resume Analyser Server" /min cmd /c ""%CD%\.venv\Scripts\python.exe" "%CD%\backend\app.py""
timeout /t 3 /nobreak >nul
start "" http://127.0.0.1:5000
echo.
echo App opened in your browser.
echo Keep the server window running while using the app.
pause
