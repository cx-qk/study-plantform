## Context

This is a greenfield Next.js 16 project (App Router, React 19, Tailwind CSS 4) with only the default scaffolding in place. We are building an English-only learning platform with Supabase as the backend (Auth + PostgreSQL) and deploying on Vercel. The platform needs Google OAuth login, a Coursera-style homepage, course browsing, study planning, progress tracking, Q&A, and user profiles.

Current state: bare `create-next-app` output with no additional dependencies or pages.

## Goals / Non-Goals

**Goals:**
- Deliver a fully functional MVP with all 7 pages (Home, Login, Courses, Study Plan, Progress, Q&A, Profile)
- Google-only authentication with Supabase Auth
- Clean, responsive UI using shadcn/ui components + Tailwind CSS 4
- Supabase PostgreSQL with Row Level Security for data access control
- Server-side rendering where possible (Next.js App Router server components)
- Deployable to Vercel with zero additional infrastructure

**Non-Goals:**
- Admin panel / CMS for managing courses (seed data or direct DB management for now)
- Mobile app or PWA capabilities
- Multiple auth providers (only Google)
- Real-time features (live chat, notifications)
- Payment / subscription system
- Internationalization (English only)
- Video hosting (courses link to external video or are text-based)

## Decisions

### 1. Supabase SSR auth pattern with middleware

**Decision**: Use `@supabase/ssr` for server-side auth with Next.js middleware to protect routes.

**Why**: `@supabase/ssr` is the official package for Next.js App Router integration. Middleware intercepts requests before rendering, redirecting unauthenticated users from protected routes (`/study-plan`, `/progress`, `/qa`, `/profile`) to `/login`. The homepage and `/courses` remain public.

**Alternatives considered**:
- Client-only auth: Causes flash of unauthenticated content, poor UX
- NextAuth.js: Extra abstraction layer when Supabase Auth already handles everything

### 2. Server Components by default, Client Components where needed

**Decision**: Use React Server Components for data-fetching pages; Client Components only for interactive elements (search, forms, modals, dropdowns).

**Why**: Reduces client JS bundle, faster initial loads. Course listings, progress dashboards, and Q&A threads load data on the server. Interactive pieces (search bar, plan editor, question form) are isolated `"use client"` components.

### 3. shadcn/ui for component library

**Decision**: Install shadcn/ui and use its components (Button, Card, Input, Dialog, Avatar, Progress, Badge, Tabs, DropdownMenu, etc.).

**Why**: shadcn/ui gives us high-quality, accessible, customizable components that work natively with Tailwind CSS. Not an npm dependency — components are copied into the project at `components/ui/`, giving us full control.

### 4. Database schema with Row Level Security

**Decision**: All tables use RLS policies. Users can only read/write their own data (enrollments, plans, progress). Courses and categories are publicly readable. Questions and answers are readable by all authenticated users, writable by their author.

**Why**: Supabase exposes the database directly to the client via the anon key. RLS is the security boundary — without it, any user could modify any data.

### 5. Route structure

**Decision**:
```
app/
├── (public)/           # Public layout group (no auth required)
│   ├── page.tsx        # Home
│   ├── login/page.tsx  # Login
│   └── courses/
│       ├── page.tsx    # Course listing
│       └── [id]/page.tsx  # Course detail
├── (protected)/        # Protected layout group (auth required)
│   ├── study-plan/page.tsx
│   ├── progress/page.tsx
│   ├── qa/page.tsx
│   └── profile/page.tsx
├── layout.tsx          # Root layout (Header + Footer)
├── auth/callback/route.ts  # Supabase OAuth callback
└── globals.css
```

**Why**: Route groups `(public)` and `(protected)` share the same URL structure but allow different layout behaviors. The protected group's layout checks auth and redirects. The root layout contains the shared Header and Footer so they appear on every page.

### 6. Component organization

**Decision**:
```
components/
├── ui/          # shadcn/ui components (auto-generated)
├── layout/      # Header, Footer, NavLinks
├── home/        # Hero, CourseCarousel, CategoryGrid, Features
├── courses/     # CourseCard, CourseFilter, LessonList
├── study-plan/  # PlanCard, PlanForm, PlanItemList
├── progress/    # ProgressChart, ActivityHistory, StreakBadge
├── qa/          # QuestionCard, AnswerForm, QuestionForm
└── profile/     # ProfileInfo, EnrolledCourses, Settings
```

**Why**: Feature-based organization keeps related components together and scales well as the project grows.

### 7. Supabase client utilities

**Decision**: Create two Supabase client helpers:
- `lib/supabase/client.ts` — browser client (for Client Components)
- `lib/supabase/server.ts` — server client (for Server Components, Route Handlers, Middleware)

**Why**: Server and client contexts require different Supabase client initialization. Centralizing this avoids boilerplate in every file.

## Risks / Trade-offs

- **[No admin panel]** → Course content must be managed via Supabase dashboard or SQL seeds. Acceptable for MVP; admin panel can be added later.
- **[Google-only auth]** → Users without Google accounts cannot use the platform. Mitigated: target audience likely has Google accounts; additional providers are easy to add via Supabase config.
- **[No real-time]** → Q&A won't auto-update when new answers arrive; users must refresh. Mitigated: acceptable for MVP; Supabase Realtime can be added later.
- **[Client-side Supabase access]** → Relies entirely on RLS for security. Mitigated: thorough RLS policies on every table; no table left without policies.
- **[External video hosting]** → Courses link to external videos or are text-based; no built-in video player. Acceptable for MVP scope.
