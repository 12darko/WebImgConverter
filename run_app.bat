@echo off
echo ==========================================
echo VormPixyze - Local Development Starter
echo ==========================================
echo.
echo [1/2] Installing dependencies (this might take a minute)...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] npm install failed. Please check your nodejs installation.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/2] Starting local server...
echo.
echo When the server starts, open your browser and go to: http://localhost:3000
echo.
call npm run dev
pause
