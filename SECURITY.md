# Security Policy

This repository is archived and no longer receives scheduled security fixes.

## Supported versions

| Version | Supported |
|---|---|
| 0.1.x | No (archived) |
| < 0.1.0 | No |

## Reporting a vulnerability

For responsible disclosure, do not open public issues.

- Preferred channel: GitHub Security Advisories
  - https://github.com/ESousa97/front-server-esdatabasev2/security/advisories/new
- Alternative contact: via GitHub profile
  - https://github.com/ESousa97

## Response SLA

- This project has no guaranteed SLA due to archived status.
- Security reports may receive best-effort acknowledgment only.

## Disclosure process

1. Report received and acknowledged.
2. Reproduction and impact analysis.
3. Fix prepared and validated.
4. Coordinated disclosure after patch release.

## Security baseline

- Dependency audit in CI (`npm audit --audit-level=high`)
- No real secrets in repository
- Environment values documented in `.env.example`
