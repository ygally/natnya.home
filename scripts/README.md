# Helper Scripts

These scripts automatically detect your environment (Gitpod or local) and display the correct URL to access your application.

## Available Scripts

### `./scripts/dev.sh`
Start the Next.js development server with hot reload.
- **Port:** 3000
- **Command:** `npm run dev`
- **Use case:** Active development with live reload

### `./scripts/start.sh`
Start the production build server.
- **Port:** 3000
- **Command:** `npm start`
- **Prerequisites:** Run `npm run build` first
- **Use case:** Testing production build locally

### `./scripts/docker-up.sh`
Start the application using Docker Compose.
- **Port:** 3000
- **Command:** `docker compose up --build -d`
- **Use case:** Testing containerized application

### `./scripts/show-url.sh [PORT]`
Display the access URL for a given port.
- **Usage:** `./scripts/show-url.sh 3000`
- **Use case:** Get the URL without starting a server

## Environment Detection

All scripts automatically detect:
- **Gitpod:** Shows HTTPS preview URL (e.g., `https://3000--<workspace-id>.eu-central-1-01.gitpod.dev`)
- **Local:** Shows localhost URL (e.g., `http://localhost:3000`)

## Examples

```bash
# Development
./scripts/dev.sh

# Production (after building)
npm run build
./scripts/start.sh

# Docker
./scripts/docker-up.sh

# Just show the URL
./scripts/show-url.sh 3000
```

## Custom Port

Set the `PORT` environment variable to use a different port:

```bash
PORT=8080 ./scripts/dev.sh
```
