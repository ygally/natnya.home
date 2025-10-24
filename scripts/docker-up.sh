#!/bin/bash
# Start Docker Compose with URL display

PORT=${PORT:-3000}

if [ -n "$GITPOD_ENVIRONMENT_ID" ]; then
  URL=$(gitpod environment port list --format json 2>/dev/null | jq -r ".[] | select(.port == $PORT) | .url" 2>/dev/null)
  if [ -z "$URL" ] || [ "$URL" = "null" ]; then
    URL="https://${PORT}--${GITPOD_ENVIRONMENT_ID}.eu-central-1-01.gitpod.dev"
  fi
else
  URL="http://localhost:${PORT}"
fi

docker compose up --build -d

echo ""
echo "✅ App is running!"
echo "   Access at: $URL"
echo ""
