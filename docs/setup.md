# Setup Guide

## Local setup

```bash
git clone https://github.com/ESousa97/front-server-esdatabasev2.git
cd front-server-esdatabasev2
npm ci
cp .env.example .env
npm run dev
```

## Validation commands

```bash
npm run lint
npm run test
npm run build
npm run validate
```

## Environment

Configure `.env`:

```bash
REACT_APP_API_URL=http://localhost:8000/api/v1
```

## Troubleshooting

- If tests fail after dependency change, run `npm ci` to restore lockfile state.
- If browser compatibility warning appears, run `npx update-browserslist-db@latest`.
