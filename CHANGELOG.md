# Changelog

All notable changes to this project are documented in this file.

The format is based on Keep a Changelog and this project follows Semantic Versioning.

## [0.2.1] - 2026-02-18

### Changed
- Project status updated to archived/final across repository documentation.
- Contribution and maintenance expectations marked as closed.

### Security
- Security policy updated to archived mode (best-effort only, no guaranteed SLA).

## [0.2.0] - 2026-02-18

### Added
- Repository governance files: issue templates, PR template, CODEOWNERS and funding metadata.
- CI workflows for quality, dependency review and scheduled security audit.
- Dependabot configuration for npm and GitHub Actions.
- Lint and format toolchain with ESLint/Prettier scripts.
- Centralized design tokens in `src/styles/tokens.css`.
- Storage utility and centralized storage key constants.
- Core project documentation: CONTRIBUTING, SECURITY, CODE_OF_CONDUCT and architecture docs.

### Changed
- README rewritten for production-grade onboarding and operational clarity.
- `package.json` scripts standardized (`dev`, `lint`, `test:coverage`, `validate`, etc.).
- `react-router-dom` aligned to CRA-compatible v6.
- API service hardened with timeout, safer token handling and controlled logging.
- Theme/auth/content persistence refactored to shared storage utilities.

### Removed
- Unused files: `src/logo.svg` and `src/components/styles/index-directory.css`.

### Fixed
- App test now validates current auth routing behavior instead of CRA default placeholder text.

### Security
- `.gitignore` and `.env.example` hardened to reduce accidental secret leakage.
- Session token flows centralized and defensive checks added for refresh behavior.
