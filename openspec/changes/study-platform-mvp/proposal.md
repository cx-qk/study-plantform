## Why

We need a modern, English-only learning platform where users can discover courses, plan their studies, track progress, and engage through Q&A — all behind a simple Google sign-in. The platform targets learners who want a structured, self-paced learning experience with progress visibility. Building now on Next.js 16 + Supabase gives us a fast, serverless-first architecture deployable on Vercel with minimal ops overhead.

## What Changes

- Add Google OAuth authentication via Supabase Auth (sole login method)
- Build a Coursera-style homepage with hero section, popular courses, category browsing, and feature highlights
- Create a course catalog with listing, filtering, and detail pages (courses contain ordered lessons)
- Add study plan management — users create plans with goals, target dates, and linked courses
- Add progress tracking — lesson completion, visual progress bars, and activity history
- Build a Q&A system — users post questions (optionally tied to courses) and answer each other
- Add a user profile page with account info, enrolled courses overview, and settings
- Implement a shared layout with top header navigation and dark-style footer
- Set up Supabase database schema with Row Level Security policies
- Install and configure shadcn/ui component library

## Capabilities

### New Capabilities

- `google-auth`: Google OAuth sign-in via Supabase Auth, session management, auto-profile creation on first login, auth middleware for protected routes
- `shared-layout`: Top header navigation bar (Logo, Home, Courses, Study Plan, Progress, Q&A, Profile/Login) and dark-style footer with links and copyright
- `homepage`: Coursera-style landing page with hero section, search bar, popular courses carousel, category grid, and features/benefits section
- `course-catalog`: Course listing with search/filter, course detail page with lessons list, category system, enrollment
- `study-plan`: User-created study plans with goals, target dates, and linked courses; CRUD operations on plans
- `progress-tracking`: Lesson completion tracking, progress percentage per course, visual indicators (progress bars), activity/streak history
- `qa-system`: Question posting (optionally course-linked), answer posting, user-to-user Q&A board
- `user-profile`: Profile page showing Google account info, enrolled courses summary, and user settings
- `database-schema`: Supabase PostgreSQL schema (profiles, courses, lessons, categories, enrollments, study_plans, study_plan_items, progress_records, questions, answers) with Row Level Security

### Modified Capabilities

(none — this is a greenfield project)

## Impact

- **Dependencies**: Add `@supabase/supabase-js`, `@supabase/ssr`, shadcn/ui components, `lucide-react` icons
- **Environment**: Requires Supabase project with Google OAuth configured (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- **Routes**: New pages at `/`, `/login`, `/courses`, `/courses/[id]`, `/study-plan`, `/progress`, `/qa`, `/profile`
- **Deployment**: Vercel with environment variables for Supabase connection
