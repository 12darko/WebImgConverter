@echo off
echo ==========================================
echo VormPixyze - CLEAN INSTALL & RUN
echo ==========================================
echo.
echo [1/3] Limiting environment (Deleting lock files)...
del package-lock.json
rmdir /s /q node_modules

echo.
echo [2/3] Installing dependencies fresh...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] npm install failed.
    echo Please ensure you have Node.js installed.
    pause
    exit /b %errorlevel%
)

echo.
echo [2.5/3] Fixing Google AI SDK version...
call npm install @google/generative-ai


echo.
echo [3/3] Starting server (Port 3000)...
echo.
echo Open http://localhost:3000 in your browser.
echo.
call npx vite --port 3000
pause
