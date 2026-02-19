# Deployment

## Build artifact

```bash
npm ci
npm run build
```

Output: `build/`

## Static hosting

This project can be deployed to any static hosting provider (Vercel, Netlify, S3 + CDN, Nginx).

## Required environment

Set the production API base URL:

```bash
REACT_APP_API_URL=https://your-api.example.com/api/v1
```

## Runtime notes

- Ensure all SPA routes are redirected to `index.html`.
- Keep HTTPS enabled for secure cookie and token flows.
- Run CI checks (`lint`, `test`, `build`) before release.
