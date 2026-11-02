#!/bin/bash
# Script to run FastAPI backend and React frontend concurrently

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🚀 Starting Raj Chaudhary Portfolio (Backend + Frontend)..."

# Trap CTRL+C to terminate both background jobs
cleanup() {
  echo ""
  echo "🛑 Stopping services..."
  kill $(jobs -p) 2>/dev/null
  exit
}
trap cleanup SIGINT SIGTERM

# Start FastAPI backend
echo "📦 Starting FastAPI backend on http://localhost:8000..."
cd "$ROOT_DIR/backend"
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# Start Vite frontend
echo "🎨 Starting React frontend on http://localhost:5173..."
cd "$ROOT_DIR/frontend"
npm run dev -- --host &
FRONTEND_PID=$!

echo ""
echo "✅ Both services running!"
echo "👉 Portfolio Site : http://localhost:5173"
echo "👉 Admin Portal   : http://localhost:5173/admin/login"
echo "👉 Backend API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers."

wait
