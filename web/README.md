# WanderVista — Next.js Application

Full-stack rebuild of the WanderVista travel site (originally static HTML/CSS/JS) as a
modern Next.js app with a real backend. **Same UI/UX** — the original `styles.css` and
`admin.css` are reused verbatim, so the design is pixel-identical.

## Stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 15** (App Router, React 19, TypeScript) |
| Data fetching / cache | **TanStack Query v5** (`@tanstack/react-query`) + Devtools |
| Backend | Next.js **Route Handlers** (`app/api/*`) |
| Persistence | File-backed JSON store (`data/db.json`), self-seeding |
| Styling | Ported design system (`styles/styles.css`, `styles/admin.css`) |
| Fonts | Plus Jakarta Sans + Fraunces (Google Fonts) |

> The store reads/writes a real file and the API does genuine
> filtering / search / sorting / pagination / CRUD — no hardcoded responses.

## Run

```bash
cd web
npm install
# hero background video (kept out of git to avoid bloat — poster image is used as fallback):
cp ../assets/hero-video.mp4 public/hero-video.mp4   # optional
npm run dev      # http://localhost:4000
```

Other scripts: `npm run build`, `npm run start`, `npm run typecheck`.

On first request the API seeds `data/db.json` from `lib/seed-data.ts`. Delete that file to reset.

## Routes

**Public**
- `/` — home (hero search, stats, category banners, community trips, frames, vibe shorts, testimonials, blogs teaser)
- `/packages` — listing with region/type/price filters + sort (server-side)
- `/packages/[slug]` — detail + inline booking form
- `/blogs` — listing with category filter, search, sort, pagination
- `/blogs/[slug]` — article (markdown render, related posts, view counter)
- `/contact`, `/booking`, `/about`

**Admin** (`/admin`)
- `/admin` — dashboard (live counts from API)
- `/admin/bookings` — bookings table
- `/admin/blogs` — posts table with status tabs, search, **live delete**
- `/admin/blogs/new` — create post
- `/admin/blogs/[id]` — edit post

**API**
- `GET/POST /api/blogs` · `GET/PUT/DELETE /api/blogs/[slug]`
- `GET /api/packages` · `GET /api/packages/[slug]`
- `GET /api/community-trips`
- `GET/POST /api/bookings`
- `GET/POST /api/enquiries`
- `GET /api/testimonials`

## Architecture

```
web/
├─ app/
│  ├─ layout.tsx          # fonts, Font Awesome, Providers
│  ├─ providers.tsx       # QueryClientProvider + Devtools
│  ├─ globals.css         # imports ../styles/*.css
│  ├─ page.tsx            # home
│  ├─ (public pages)/     # blogs, packages, contact, booking, about
│  ├─ admin/              # admin pages
│  └─ api/                # Route Handlers (the backend)
├─ components/
│  ├─ Header / Footer / Carousel / PackageCard / Newsletter / FloatingButtons
│  ├─ home/               # Hero, StatsBar, CommunityTrips, Frames, VibeShorts, ...
│  └─ admin/              # AdminShell, BlogEditor
├─ lib/
│  ├─ types.ts            # domain models
│  ├─ db.ts               # file-backed store (read/write/mutate, atomic)
│  ├─ seed-data.ts        # initial dataset
│  ├─ query.ts            # paginate() helper
│  ├─ api.ts              # typed fetch client
│  ├─ hooks.ts            # TanStack Query hooks (queries + mutations)
│  └─ markdown.tsx        # minimal markdown → JSX for blog content
└─ styles/                # ported styles.css + admin.css (unchanged design)
```

## Data flow

UI → TanStack Query hook (`lib/hooks.ts`) → typed client (`lib/api.ts`) →
Route Handler (`app/api/*`) → file store (`lib/db.ts`).

Mutations (create/update/delete blog, create booking/enquiry) invalidate the relevant
query keys so the UI reflects changes immediately — e.g. publishing a post in the admin
editor makes it appear on `/blogs` and the homepage teaser.
