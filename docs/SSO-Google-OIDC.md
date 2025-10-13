## Google OIDC SSO - Specification

### Objective
Enable sign-in with Google for visitors who want to collaborate with Nat & Ya Solutions, returning to the homepage with a friendly confirmation flash.

### User Experience
- Homepage CTA banner (concise, professional):
  - Copy: "Want to collaborate on your project with us? Sign in with Google and share your goals."
  - Button: Google logo-only button with accessible label: "Sign in with Google".
- Post-login behavior:
  - Redirect back to `/` with a success flash: border 1px lime/green, pastel green background, text same hue as border.
  - Flash message: "You're signed in. Let's explore your project and co-create value!"
  - Flash auto-dismisses after 10 seconds with a thin yellow progress bar indicating remaining time.

### Scope
- App Router (Next.js 14) with route handlers for OAuth callbacks.
- Provider: Google Identity (OpenID Connect, OAuth 2.0).
- Store session with encrypted JWT cookie (no DB needed initially).
- Minimal PII: email, name, picture (optional); avoid storing beyond session.

### Architecture
- Routes:
  - `GET /api/auth/login` -> redirects to Google OAuth consent screen
  - `GET /api/auth/callback` -> verifies code, exchanges token, establishes session, redirects to `/?login=success`
  - `POST /api/auth/logout` -> clears session cookie
- Session:
  - Signed, encrypted JWT in a `HttpOnly; Secure; SameSite=Lax` cookie
  - Contains: `sub` (Google user id), `email` (optional), `name` (optional), `exp`
- UI:
  - Header: add CTA banner component above hero when not authenticated
  - Flash component: reads `?login=success` and shows 10s dismissible alert with progress bar

### Security
- Use `state` and `nonce` parameters; verify on callback to prevent CSRF/replay.
- PKCE (S256) for public clients.
- Short session lifetime; rolling refresh optional.
- CSP updates: allow `https://accounts.google.com` for `connect-src` and `frame-src` if needed.
- Rotate client secrets, store in secrets manager / CI secrets.

### Configuration
- Env vars (local `.env.local`, CI, and Cloud Run):
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_REDIRECT_URI` (e.g., `http://localhost:3000/api/auth/callback`, prod uses HTTPS domain)
  - `SESSION_SECRET` (32+ chars)
  - `APP_URL` (e.g., `http://localhost:3000` or prod URL)

### Implementation Steps
1) Create Google OAuth 2.0 Client
   - Google Cloud Console -> Credentials -> Create OAuth client ID (Web application)
   - Authorized redirect URI: `${APP_URL}/api/auth/callback`
2) Add dependencies
   - Option A: Implement minimal OAuth with `fetch` and JOSE (`jose` package)
   - Option B: Use `next-auth` with Google provider for faster setup
3) Create route handlers
   - `/app/api/auth/login/route.ts`: build auth URL with `state`/`nonce` + PKCE, set cookies, redirect
   - `/app/api/auth/callback/route.ts`: verify state/nonce, exchange code, verify ID token, set session cookie, redirect to `/?login=success`
   - `/app/api/auth/logout/route.ts`: clear cookie
4) Session utilities
   - `lib/session.ts`: sign/verify JWT, get current user from request cookies (server-only)
5) UI additions
   - `components/SignInBanner.tsx`: CTA copy + Google icon button
   - `components/Flash.tsx`: success alert with 10s timer + thin yellow progress bar
   - Integrate: show banner when no session; after success, show flash
6) CSP and headers
   - Update `next.config.mjs` security headers: add `https://accounts.google.com` to `connect-src` and `frame-src` if using iframes
7) Docker/compose/Cloud Run
   - Pass env vars via compose and Cloud Run `--set-env-vars`
   - Ensure cookies `Secure` in production (behind HTTPS)
8) CI/CD
   - Add required secrets to GitHub Environments and repository secrets (WIF or OIDC to Secret Manager)
9) Tests
   - Unit: state/nonce verification, JWT sign/verify
   - E2E (Playwright): login flow mocked; Flash auto-dismiss after 10s

### Minimal next-auth variant (recommended)
- Packages: `next-auth`, `@auth/core`, `@auth/core/providers/google`
- Pages not required with App Router; use route handlers under `/app/api/auth/[...nextauth]/route.ts`
- Env: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- Session Strategy: `jwt`
- UI: use `signIn('google')` action and `useSession()` to show banner/flash

### Milestones
- M1: Technical spike; choose next-auth vs custom
- M2: Auth routes + session util + basic banner
- M3: Flash with progress + CSP updates
- M4: Docker/compose/env wiring; Cloud Run envs
- M5: CI secrets and e2e tests

### Acceptance Criteria
- Users can click Google, authorize, and return to `/` with a 10s green success flash and a thin yellow progress bar.
- Session persists via cookie; `logout` clears state.
- No PII stored beyond the session; CSP and headers remain strict.
