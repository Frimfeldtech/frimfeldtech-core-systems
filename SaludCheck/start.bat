@echo off
echo Iniciando SaludCheck...
echo 1. Iniciando Backend (Puerto 3001)...
start "SaludCheck API" cmd /k "node server.js"
timeout /t 2 >nul

echo 2. Iniciando Frontend Web (Puerto 5173)...
start "SaludCheck Web" cmd /k "cd web && npm run dev"

echo 3. Iniciando App Movil (Expo)...
start "SaludCheck Mobile" cmd /k "cd mobile && npx expo start"

echo Todo listo! Escanea el QR en la ventana de Mobile para probar la app.
pause
