# Contributing

## Project status

This repository is archived and no longer accepts pull requests, feature requests, or maintenance updates.
The current codebase is the final published version and remains available for study and fork usage.

## Development setup

```bash
git clone https://github.com/ESousa97/front-server-esdatabasev2.git
cd front-server-esdatabasev2
npm ci
cp .env.example .env
npm run dev
```

## Code style

- Indentation and line endings follow `.editorconfig`
- Lint rules are defined in `.eslintrc.cjs`
- Formatting rules are defined in `.prettierrc`
- Design tokens are centralized in `src/styles/tokens.css`

## Historical branch and commit conventions

### Branch naming

- `feat/<short-description>`
- `fix/<short-description>`
- `refactor/<short-description>`
- `docs/<short-description>`

### Conventional Commits

```text
<type>(<scope>): <description>
```

Allowed types:

- `feat` — new functionality
- `fix` — bug fix
- `refactor` — behavior-preserving refactor
- `docs` — documentation changes
- `style` — formatting only
- `test` — test changes
- `chore` — maintenance/config/dependencies
- `ci` — CI/CD changes
- `perf` — performance improvements
- `security` — security fixes

## Historical pull request process

1. Create a focused branch.
2. Keep changes atomic and behavior-safe.
3. Run local validation:
   ```bash
   npm run validate
   ```
4. Open PR using `.github/PULL_REQUEST_TEMPLATE.md`.
5. Address review comments before merge.

This process is kept only as historical documentation and is not active in this repository anymore.

## Test strategy

- Unit tests for reusable logic and utilities first
- Integration tests for critical user workflows
- Keep flaky tests out of main branch

Run tests:

```bash
npm run test
npm run test:coverage
```

## Contribution areas

- Test coverage expansion
- UI consistency and accessibility
- Performance improvements in heavy pages
- Dependency maintenance and security hardening

## Maintainer

- Enoque Sousa
- Portfólio: https://enoquesousa.vercel.app
- GitHub: https://github.com/ESousa97
