# AGENTS.md

## Project Overview

Dinario is a Progressive Web App (PWA) for personal finance management with 100% local data storage. The UI is in Spanish.

## Commands

```bash
pnpm dev      # Start development server (http://localhost:5173)
pnpm build    # Type-check and build for production
pnpm lint     # Run ESLint
pnpm preview  # Preview production build
```

## Architecture

### Tech Stack
- React 19 + TypeScript + Vite 7
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- Dexie.js for IndexedDB (all data stored locally, no backend)
- React Router v7 for SPA routing
- vite-plugin-pwa for PWA features

### Data Layer
- `src/db.ts` - Dexie database schema with three tables: `configuracion`, `ingresosDiarios`, `deudas`
- `src/hooks/useFinance.ts` - Single hook that provides all financial data and CRUD operations via `useLiveQuery`
- All calculations (net income, available balance) are derived in the hook

### Key Patterns
- Pages are lazy-loaded in `App.tsx` using `React.lazy()`
- Types are centralized in `src/types/index.ts`
- Currency formatting uses `Intl.NumberFormat` (USD format) in `src/utils/formatCurrency.ts`
- Icons from `lucide-react`

### Directory Structure
```
src/
├── components/   # Reusable UI components (Header, Footer, KpiCard, etc.)
├── pages/        # Route pages (HomePage, SettingsPage, AddTransactionPage)
├── hooks/        # useFinance hook
├── types/        # TypeScript interfaces
├── utils/        # Formatting utilities
└── db.ts         # Dexie database definition
```

## Important Notes
- No test framework is configured
- All user data persists in browser IndexedDB - never add external APIs or backends
- PWA manifest is configured in `vite.config.ts`
