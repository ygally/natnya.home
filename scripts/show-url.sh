#!/bin/bash
# Display the preview URL for the application

PORT=${1:-3000}

if [ -n "$GITPOD_ENVIRONMENT_ID" ]; then
  # Get URL from gitpod CLI
  URL=$(gitpod environment port list --format json 2>/dev/null | jq -r ".[] | select(.port == $PORT) | .url" 2>/dev/null)
  if [ -z "$URL" ] || [ "$URL" = "null" ]; then
    # Fallback: construct URL manually
    REGION=$(echo "$GITPOD_ENVIRONMENT_ID" | cut -d'-' -f5-)
    URL="https://${PORT}--${GITPOD_ENVIRONMENT_ID}.eu-central-1-01.gitpod.dev"
  fi
else
  URL="http://localhost:${PORT}"
fi

echo ""
echo "✅ App is running!"
echo "   Access at: $URL"
echo ""
