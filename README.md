# Gulfport Demo Forecast

<img width="2226" height="997" alt="image" src="https://github.com/user-attachments/assets/b3e3afa1-57cd-4b63-abe6-5dc158f75ef6" />
<img width="2226" height="997" alt="image" src="https://github.com/user-attachments/assets/80007951-16cb-4546-b6e2-86ffe642067f" />



A 10-day marine weather forecast dashboard for Gulfport, MS, built to support on-site demo scheduling. It combines hourly weather and marine data into a GO / NO-GO decision for each day, with drill-down hourly detail.

## Setup

**Prerequisites:** Node.js 18+ and [pnpm](https://pnpm.io/installation)

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
pnpm build      # production build
pnpm typecheck  # type-check without emitting
pnpm lint       # ESLint
pnpm format     # Prettier
```

## Tech Stack

| Layer         | Library                                                                        |
| ------------- | ------------------------------------------------------------------------------ |
| Framework     | [React 19](https://react.dev) + [TypeScript 6](https://www.typescriptlang.org) |
| Build         | [Vite 8](https://vitejs.dev)                                                   |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com)                                     |
| UI Components | [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com)            |
| Data Fetching | [TanStack Query v5](https://tanstack.com/query)                                |
| Data Source   | [Open-Meteo](https://open-meteo.com)                                           |

## Data Sources

Two Open-Meteo endpoints are fetched in parallel and merged hourly:

- **Weather API** — visibility (converted to nautical miles), wind speed (knots), precipitation (inches)
- **Marine API** — wave height (feet)

## GO / NO-GO Thresholds

| Condition     | NO-GO                 |
| ------------- | --------------------- |
| Wind speed    | > 20 kn               |
| Visibility    | < 2 nm                |
| Wave height   | > 4 ft                |
| Precipitation | > 0.3 in (worst hour) |

Each day card shows worst-case conditions across all hours. Click any card to see the full hourly breakdown.
