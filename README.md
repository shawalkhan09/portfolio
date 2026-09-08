# Shawal Khan — Personal Portfolio

Personal portfolio site for Shawal Khan (ML Engineer & Full-Stack Web Developer). A single-page site: hero, selected work, about, experience, updates, and contact.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://motion.dev) for interactions and scroll reveals
- Content as local typed data under `src/data/` — no CMS
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npm run format` / `npm run format:check` — Prettier

## Project structure

- `src/app/` — routes, layout, metadata, sitemap/robots, OG image
- `src/components/` — page sections and UI
- `src/data/` — typed content: projects, nav tree, experience, skills, news, about copy
- `src/types/content.ts` — shared content types
- `src/lib/site.ts` — site name, tagline, and URL
- `public/` — static assets (project screenshots, resume, profile photo)

## Content

Site copy and links live in `src/data/` and `src/lib/site.ts`, typed via `src/types/content.ts`. Update those files rather than hardcoding text in components — the header nav, footer, and page sections all read from the same data.
