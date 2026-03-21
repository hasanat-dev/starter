# Hasanat Deploy Skill

## Overview

Deploy Hasanat apps to Cloudflare Pages for free global hosting.

## Prerequisites

1. [Cloudflare account](https://dash.cloudflare.com/sign-up) (free)
2. [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed
3. Authenticated: `npx wrangler login`

## Deployment Steps

### 1. Configure wrangler.toml

Edit `wrangler.toml` with your app name:

```toml
name = "your-app-name"
compatibility_date = "2025-01-01"
compatibility_flags = ["nodejs_compat"]

[vars]
PUBLIC_SITE_URL = "https://your-app.hasanat.dev"
PUBLIC_APP_NAME = "Your App Name"

# Uncomment if using D1
# [[d1_databases]]
# binding = "DB"
# database_name = "your-app-db"
# database_id = "your-database-id"
```

### 2. Build and Deploy

```bash
npm run build
npx wrangler pages deploy dist/
```

### 3. Request Subdomain

After your app is deployed and working:

1. Submit at [hasanat.dev/apps/submit](https://hasanat.dev/apps/submit)
2. Include your Cloudflare Pages URL
3. Once approved, you'll get `your-app.hasanat.dev`

### 4. Set Up Custom Domain

After subdomain approval, in Cloudflare dashboard:
1. Go to Pages → your project → Custom domains
2. Add `your-app.hasanat.dev`
3. DNS will be configured by the Hasanat team

## Environment Variables

Set these in Cloudflare Pages dashboard (Settings → Environment variables):

| Variable | Value |
|----------|-------|
| `AUTH_SECRET` | Provided after app approval |
| `PUBLIC_SITE_URL` | `https://your-app.hasanat.dev` |
| `PUBLIC_APP_NAME` | Your app's display name |

## CI/CD with GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          command: pages deploy dist/ --project-name=your-app-name
```

## Hosting Elsewhere

If you're not using Cloudflare Pages:

1. Deploy your app to your preferred platform (Vercel, Netlify, VPS, etc.)
2. Submit at [hasanat.dev/apps/submit](https://hasanat.dev/apps/submit)
3. Provide your app's URL
4. You'll get a subdomain that points to your hosting via CNAME
5. For auth, use OAuth 2.0 flow instead of shared cookie

## Troubleshooting

- **Build fails**: Run `npm run check` to catch TypeScript errors
- **D1 not found**: Ensure database_id is correct in wrangler.toml
- **Auth not working**: Verify AUTH_SECRET matches auth.hasanat.dev
- **404 on routes**: Ensure `output: "server"` in astro.config.mjs
