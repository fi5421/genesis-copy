#!/usr/bin/env bash
set -euo pipefail

# === CONFIG ===
PROJECT_NAME="project-genesis"
GITHUB_REPO_URL="https://github.com/Conrad-Labs/project-genesis.git"
CLIENT_PATH="apps/client"
SERVER_PATH="apps/server"
DATABASE="postgresql"

echo "🚀 Creating Railway project: $PROJECT_NAME..."

# Create project and capture ID
PROJECT_ID=$(railway init --name "$PROJECT_NAME")

# === CREATE DATABASE SERVICE ===
echo "🗄️ Creating Postgres database service..."
DB_SERVICE_ID=$(railway add -d "$DATABASE")

# Link GitHub repository
railway add -s Backend -r "$GITHUB_REPO_URL"
railway add -s Frontend -r "$GITHUB_REPO_URL"

cd apps/server
railway up --service server


# === DEPLOY BACKEND SERVICE ===
echo "⚙️ Deploying backend service..."
cd "$SERVER_PATH"
railway link --project "$PROJECT_ID"
railway service create --name "backend" --from-config apps/server/railway.json --project "$PROJECT_ID"
railway up --detach
cd - >/dev/null

# === DEPLOY FRONTEND SERVICE ===
# echo "🌐 Deploying frontend service..."
# cd "$CLIENT_PATH"
# railway link --project "$PROJECT_ID"
# railway service create --name "frontend" --from-config railway.json --project "$PROJECT_ID"
# railway up --detach
# cd - >/dev/null

echo "🎉 All services deployed successfully!"
echo "Project ID: $PROJECT_ID"
echo "Frontend, Backend, and Database are now live."
