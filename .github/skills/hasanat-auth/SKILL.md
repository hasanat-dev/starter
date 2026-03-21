# Hasanat Auth Skill

## Overview

This skill covers authentication integration with auth.hasanat.dev for apps in the Hasanat ecosystem.

## Architecture

auth.hasanat.dev is a shared authentication service for all `*.hasanat.dev` apps.

**For Cloudflare-hosted apps** (first-party):
- Auth uses a shared cookie (`authjs.session-token`) scoped to `.hasanat.dev`
- The middleware in `src/middleware.ts` reads this cookie and verifies the JWT
- No additional auth setup needed — it works out of the box

**For externally-hosted apps** (third-party):
- Auth uses OAuth 2.0 Authorization Code flow
- Register your app to get a client_id
- Redirect users to `auth.hasanat.dev/oauth/authorize`
- Exchange the code for a token at `auth.hasanat.dev/oauth/token`

## Usage — First-Party (Cookie Auth)

### Accessing the User

```typescript
// In any .astro page or API route:
const user = Astro.locals.user;

if (user) {
  // user.id — unique identifier
  // user.name — display name
  // user.email — email address
  // user.image — profile image URL
  // user.role — "admin" | "builder" | "user"
}
```

### Requiring Authentication

```typescript
import { requireAuth } from "@/lib/auth";

// Redirects to sign-in if not authenticated
const redirect = requireAuth(Astro.locals.user, Astro.url.href);
if (redirect) return redirect;
```

### Sign-In / Sign-Out Links

```typescript
import { getSignInUrl, getSignOutUrl } from "@/lib/auth";

const signIn = getSignInUrl(currentUrl);
const signOut = getSignOutUrl(currentUrl);
```

### Admin Check

```typescript
import { isAdmin } from "@/lib/auth";

if (isAdmin(Astro.locals.user)) {
  // Show admin controls
}
```

## How the Middleware Works

```
1. Request arrives at your app
2. Middleware reads `authjs.session-token` cookie
3. JWT is decoded (HS256, shared secret)
4. User object is attached to Astro.locals.user
5. If no cookie or invalid JWT → user is null (not signed in)
```

The shared secret is the `AUTH_SECRET` environment variable, which must match the one used by auth.hasanat.dev.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AUTH_SECRET` | Yes (production) | JWT signing secret — must match auth.hasanat.dev |

For local development, auth is mocked — no AUTH_SECRET needed.

## Important Notes

- Never store auth tokens or passwords in your app
- Always use `Astro.locals.user` — don't parse the cookie yourself
- The cookie is httpOnly, secure, SameSite=lax — JavaScript cannot access it
- Auth sessions expire according to auth.hasanat.dev configuration
- Do NOT add Firebase Auth, Clerk, or any other auth provider
