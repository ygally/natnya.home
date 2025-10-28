## Nat & Ya Solutions - SPA

A modern Next.js + Tailwind single-page app showcasing Nat & Ya Solutions.

### Requirements
- Node.js 20+
- Docker 24+
- Docker Compose v2
- Make (GNU make)
- For GCP deployments:
  - Google Cloud SDK (`gcloud`) installed and authenticated
  - APIs enabled: `run.googleapis.com`, `artifactregistry.googleapis.com`, `cloudbuild.googleapis.com`
  - A Docker Artifact Registry repo (created by `make gcp-repo`)

### Install and run
- Dev server:
  - `npm install`
  - `npm run dev` -> `http://localhost:3000`
  - **Or use:** `./scripts/dev.sh` (shows Gitpod URL automatically)
- Production build locally:
  - `npm run build && npm start`
  - **Or use:** `./scripts/start.sh` (shows Gitpod URL automatically)

### Docker local
- Build image: `make build`
- Run with compose: `make up` then open `http://localhost:3000`
  - **Or use:** `./scripts/docker-up.sh` (shows Gitpod URL automatically)
- Stop: `make down`
- Logs: `make logs`
- Clean: `make clean`
- Note: `make` with no arguments runs `make build` by default.

**Gitpod Users:** The scripts in `./scripts/` automatically detect Gitpod and display the correct HTTPS preview URL.

### GCP Deployment (Cloud Run)
- Default settings: `GCP_PROJECT=home-natnya-fr-20180707`, `GCP_REGION=europe-west1`
- Override: `make gcp-init GCP_PROJECT=your-project-id`
- Initial setup (all-in-one):
  - `make gcp-init` (auth, enable APIs, create repo, grant permissions)
- Deploy via Cloud Build (recommended):
  - `make gcp-cb-build` (builds and pushes `$(GCP_REGION)-docker.pkg.dev/$GCP_PROJECT/containers/natya:$TAG`)
  - `make gcp-deploy`
- Custom domain (optional):
  - `make gcp-domain-map` to map solutions.natnya.fr (override with `DOMAIN_NAME=your.domain`)
  - `make gcp-domain-info` to get DNS records to add to your domain provider
  - `make gcp-domain-status` to check mapping status
- Manual path (build locally then push):
  - `make gcp-login`
  - `make gcp-build-push`
  - `make gcp-deploy`

### CI/CD (GitHub Actions)
- Security checks: `.github/workflows/security.yml`
  - ESLint (SAST-like), npm audit (SCA), Trivy image, ZAP baseline (DAST)
- CodeQL: `.github/workflows/codeql.yml`
- Deploy (Cloud Run, WIF): `.github/workflows/deploy-gcp.yml`
  - Required repo secrets: `WIF_PROVIDER`, `WIF_SERVICE_ACCOUNT`, optionally `GCP_PROJECT_ID`

### Assets
- Add your company logo at `public/logo.jpg` (auto-detected). Vector fallback in `components/Logo.tsx`.
- Replace the 3 cards in `public/screenshots/recipe-*.svg` with real screenshots if available.

### Architecture & SOLID
- Components are small and focused: `Header`, `Footer`, `BrandMark`, `Logo`, `Providers`.
- Side effects isolated in `Providers` (animation). UI components stay pure.
- Extensibility through props and Tailwind theme ensures Open/Closed.
- No fat interfaces; minimal props keep Interface Segregation.
- Dependency direction points inward (UI -> theme), not to infra.

### Security (Shift-left)
- Strong security headers via `next.config.mjs` (CSP, HSTS, COOP/CORP, etc.).
- Non-root container user and minimal base image.
- CI includes SAST (CodeQL), SCA (npm audit), DAST (ZAP), and container scan (Trivy).
- See `SECURITY.md` for local/CI/deploy practices.

### Make targets
```bash
make                 # build local image
make up              # run compose
make down            # stop compose
make logs            # tail logs
make clean           # remove containers/images
make gcp-init        # initialize GCP (auth, APIs, repo, permissions) - recommended!
make gcp-cb-build    # build with Cloud Build and push
make gcp-deploy      # deploy to Cloud Run
make gcp-domain-map  # map custom domain to Cloud Run service
make gcp-domain-info # get DNS records for domain setup
make gcp-domain-status # check domain mapping status

# Individual GCP targets (if needed):
make gcp-auth        # gcloud auth and set project
make gcp-enable      # enable GCP APIs
make gcp-repo        # create Artifact Registry repo
make gcp-permissions # grant Cloud Build permission to push
make gcp-login       # docker login to AR
make gcp-build-push  # build locally and push
```

### Notes
- Security and performance linting may block builds; fix or suppress intentionally with review.
- For inspiration from `natnya/planmymeals`, I can tailor this README/Makefile further once you share access or steps via email/PR.
