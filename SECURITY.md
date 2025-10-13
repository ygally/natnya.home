# Security Guidance

This project includes security measures across development, CI, and deployment.

## Local (developer workstation)
- Run `npm audit --audit-level=high` before pushing.
- Keep Node.js and npm/yarn updated (Node 20+).
- Use `.env.local` for secrets; never commit secrets.
- Run `npm run lint` (SAST-like checks) and fix issues.

## CI SAST / SCA
- CodeQL runs on every push/PR: JavaScript/TypeScript queries (SAST).
- ESLint runs in CI for code quality and common security patterns.
- `npm audit` runs in CI to detect vulnerable dependencies (SCA).

## DAST
- OWASP ZAP Baseline scans the running app at `http://localhost:3000` during CI.
- Tune false positives via `.zap/rules.tsv`.

## Container Image Scanning
- Trivy scans the built Docker image in CI and uploads results to the Security tab.

## Deployment Hardening
- Security headers enabled via `next.config.mjs` (CSP, HSTS, COOP/CORP, etc.).
- Run container as non-root. Example Dockerfile already creates a `nextjs` user.
- Prefer distroless/node or slim base images for production.
- Set environment variables securely (secrets manager, OIDC, or GitHub Environments).
- Enforce HTTPS with HSTS and TLS 1.2+.

## Periodic
- Weekly CodeQL scheduled scan.
- Quarterly dependency review and base image refresh.

## Incident Response
- Use GitHub Security Advisories and Dependabot alerts.
- Patch and redeploy urgently when high/critical CVEs are reported.
