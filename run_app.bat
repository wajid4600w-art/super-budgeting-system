@echo off
title Super Budgeting System (SBS)
echo =======================================================
echo   Starting Super Budgeting System (SBS)...
echo =======================================================
echo.
echo Opening browser at http://localhost:3000 ...
start "" "http://localhost:3000"
node server.js
pause
