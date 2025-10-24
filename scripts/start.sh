#!/bin/bash
# Start production server with URL display

PORT=${PORT:-3000}

if [ -n "$GITPOD_ENVIRONMENT_ID" ]; then
  URL=$(gitpod environment port list --format json 2>/dev/null | jq -r ".[] | select(.port == $PORT) | .url" 2>/dev/null)
  if [ -z "$URL" ] || [ "$URL" = "null" ]; then
    URL="https://${PORT}--${GITPOD_ENVIRONMENT_ID}.eu-central-1-01.gitpod.dev"
  fi
else
  URL="http://localhost:${PORT}"
fi

echo ""
echo "🚀 Starting production server..."
echo "   Access at: $URL"
echo ""

npm start
