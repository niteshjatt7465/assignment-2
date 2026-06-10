# LearnFlow — Next-Gen Student Learning Dashboard

A high-fidelity, fully animated student dashboard built for the Frontend Intern Challenge.

![Dashboard Preview](./public/preview.png)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | Supabase (PostgreSQL) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Language | TypeScript |

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/learnflow-dashboard
cd learnflow-dashboard
npm install
```

### 2. Set Up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Open the SQL Editor and run:

```sql
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null default 0,
  icon_name text not null,
  created_at timestamptz default now()
);

-- Disable RLS for prototype (anonymous reads)
alter table courses disable row level security;

-- Seed data
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Layers'),
  ('TypeScript Mastery', 42, 'Code2'),
  ('System Design Fundamentals', 90, 'Network'),
  ('Next.js Full Stack', 28, 'Zap');
```

3. Copy your credentials from **Settings → API**

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Architectural Choices

### Server / Client Component Split

The key architectural decision is **where data lives**:

```
app/page.tsx (Server)
  └── BentoGrid (Client)        ← animation orchestration
        ├── HeroTile (Client)   ← streak counter animation
        ├── ActivityTile (Client) ← chart rendering
        └── <Suspense>
              └── CoursesSection (Server) ← Supabase fetch
                    └── CourseGrid (Client) ← stagger animations
                          └── CourseCard (Client) ← hover physics
```

`CoursesSection` is a **pure Server Component** — it fetches from Supabase and passes data down. It never ships to the browser. The Supabase client is instantiated server-side only, so credentials are never exposed.

Client Components are used exclusively for:
- Framer Motion animations (requires `useEffect` / browser APIs)
- Interactive state (sidebar collapse, active nav item)

### Suspense Boundaries

The `<Suspense>` wrapping `CoursesSection` means:
1. The page HTML (Hero tile, Activity tile, Sidebar) streams immediately
2. While Supabase is fetching, a skeleton grid renders
3. When the fetch resolves, React swaps in the real course cards

This delivers a perceived performance improvement and prevents blank pages.

### Animation Architecture

All animations use `transform` and `opacity` exclusively — no `width`, `height`, or positional properties that trigger browser layout/reflow:

- **Entrance stagger**: `staggerChildren` on container variants propagates to each tile
- **Hover elevation**: `whileHover={{ scale: 1.02 }}` with spring physics
- **Border glow**: Achieved via `box-shadow` (composited layer, no reflow)
- **Nav active pill**: `layoutId="sidebar-active-pill"` for FLIP animation
- **Progress bar**: `useMotionValue` + `animate` to drive width without re-renders

### Zero Layout Shifts

- Skeleton loaders mirror the exact pixel dimensions of real cards
- Hover states use `transform: scale()` — no margin/padding changes
- `AnimatePresence` handles sidebar label fade without reflowing the layout

---

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

---

## Challenges

**Server/Client boundary with Framer Motion**: Framer Motion requires a browser context, so any component using `motion.*` must be a Client Component. The challenge was keeping data fetching server-side while passing that data to animated client components. The solution: Server Component fetches → passes data as props → Client Component animates.

**Avoiding layout shifts with animations**: The naive approach of animating `width` on the progress bar caused layout shifts. Switched to `useMotionValue` driving an inline style, which is applied as a composited CSS transform.

**Sidebar collapse with spring physics**: Animating the sidebar `width` via Framer Motion's `animate` prop on a `motion.nav` with `type: "spring"` gives a buttery natural feel without any JavaScript layout measurement.
