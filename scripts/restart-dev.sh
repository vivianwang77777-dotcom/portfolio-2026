#!/usr/bin/env bash
# 清理卡住的 Next.js 进程并重启开发服务器
set -e

echo "Stopping processes on ports 3000 and 3001..."
for port in 3000 3001; do
  pids=$(lsof -ti :"$port" 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "  Killing port $port: $pids"
    kill -9 $pids 2>/dev/null || true
  fi
done

pkill -9 -f "next dev" 2>/dev/null || true
sleep 1

rm -f .next/dev/lock 2>/dev/null || true

echo "Starting dev server at http://127.0.0.1:3000"
exec npm run dev
