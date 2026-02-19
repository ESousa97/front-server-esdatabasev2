# Architecture

## Context

Projmanage is a React SPA used as an administrative panel for ES Data Base content operations.

## Layering

- `pages/`: route-level composition
- `components/`: feature UI and interactive logic
- `contexts/`: auth/theme cross-cutting state
- `services/`: HTTP client and network concerns
- `hooks/`: reusable behavior
- `constants/` + `utils/`: shared contracts and pure helpers

## Key decisions

1. Keep a single Axios client (`src/services/api.js`) with interceptors for auth and refresh behavior.
2. Preserve route protection with `PrivateRoute` and redirect unauthenticated sessions to `/login`.
3. Centralize localStorage keys and access helpers to reduce coupling and improve testability.
4. Use CSS tokens (`src/styles/tokens.css`) to keep visual primitives consistent.

## Trade-offs

- `localStorage` is still used for tokens due to current backend contract. Mitigation includes controlled access and centralized storage wrappers.
- CRA remains in place for backward compatibility; migration to Vite is tracked in roadmap.
