# Contributing to AQI Improvement Tracker

Thanks for your interest in contributing! This project visualizes historical air
quality trends and the policy interventions behind them. Contributions of data,
features, and fixes are all welcome.

## Priority areas

- **New cities** with documented interventions and long-term monitoring data
- **Data accuracy** improvements backed by cited sources
- **Accessibility** (screen reader support for charts, reduced-motion preferences)
- **Automated tests**

## Development setup

Prerequisites: **Node.js 18+** (a `.nvmrc` pins Node 20) and npm.

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Lint and format before committing
npm run lint
npm run format

# Verify a production build
npm run build
```

## Design constraint: desktop is frozen

The desktop layout (≥768px) is intentionally **frozen**. Mobile/responsive work
must be scoped behind Tailwind responsive prefixes and viewport checks so it does
not leak into the desktop experience. Please attach **both mobile and desktop**
screenshots for any UI change.

## Contributing data

Data integrity is core to this project. When adding or changing data points:

- Cite a reliable source (government environmental agency, WHO, peer-reviewed
  research, or Our World in Data).
- Mark interpolated/estimated values so they render with the "Estimated" indicators.
- See [`docs/DATA_METHODOLOGY.md`](./docs/DATA_METHODOLOGY.md) and
  [`docs/DATA_SOURCES_AND_VERIFICATION.md`](./docs/DATA_SOURCES_AND_VERIFICATION.md)
  for methodology and verification expectations.

## Pull request process

1. Fork the repo and create a feature branch off `main`.
2. Make your changes; ensure `npm run lint` and `npm run build` both pass.
3. Open a PR using the template and fill in the checklist.
4. Keep PRs focused — one logical change per PR.

## Code style

Formatting is handled by **Prettier** and linting by **ESLint** (run `npm run format`
and `npm run lint`). CI runs both on every PR.

By contributing, you agree that your contributions will be licensed under the
project's [MIT License](./LICENSE).
