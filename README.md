# Nestlle

Nestlle is a **verifiable community engagement hub** built as a **Stellar-only** web app: users connect with [Stellar Wallets Kit](https://stellarwalletskit.dev), complete **tasks** (social, educational, Stellar on-chain, custom), earn **XP and badges**, climb a **leaderboard**, and support **creators** with **XLM tips** (demo flows today). **Culture and African heritage** are a core narrative in the marketing and sample content.

## Product surface (from the codebase)

| Area | Purpose |
|------|--------|
| **Landing (`/`)** | Marketing: hero, features, creators, culture, how it works, CTA. |
| **Auth (`/login`, `/signup`)** | Stellar wallet connect + email-style placeholders; wallet connect redirects when connected. |
| **Dashboard** | User home: tasks, leaderboard, profile; much of the data is **mock** for prototyping. |
| **Admin** | Create/manage tasks (admin routes). |

## Tech stack

- **Vite + React + TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix)
- **React Router**
- **Stellar**: `@creit.tech/stellar-wallets-kit`, Horizon for **XLM** balance on public network

There is **no EVM stack** in this repo (no `wagmi` / `viem` / RainbowKit).

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
```

## Environment notes

- Wallet and balance use **public Stellar** (Horizon `horizon.stellar.org`). For testnet, you would point Horizon and kit network configuration accordingly.
