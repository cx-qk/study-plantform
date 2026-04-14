## 1. Project Setup & Dependencies

- [x] 1.1 Install Supabase packages (`@supabase/supabase-js`, `@supabase/ssr`)
- [x] 1.2 Initialize and configure shadcn/ui (install CLI, configure `components.json`, add CSS variables)
- [x] 1.3 Install `lucide-react` for icons
- [x] 1.4 Create environment variables file (`.env.local`) with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` placeholders
- [x] 1.5 Create Supabase client utilities (`lib/supabase/client.ts` and `lib/supabase/server.ts`)

## 2. Database Schema & Seed Data

- [x] 2.1 Create SQL migration file for all tables: `profiles`, `categories`, `courses`, `lessons`, `enrollments`, `study_plans`, `study_plan_items`, `progress_records`, `questions`, `answers`
- [x] 2.2 Create SQL migration for Row Level Security policies on all tables
- [x] 2.3 Create SQL trigger for auto-creating profile on new user signup
- [x] 2.4 Create seed data SQL with sample categories, courses, and lessons

## 3. Authentication (Google OAuth)

- [x] 3.1 Create `/login` page with "Sign in with Google" button
- [x] 3.2 Implement Google OAuth sign-in action using Supabase Auth
- [x] 3.3 Create `/auth/callback/route.ts` to handle OAuth callback and code exchange
- [x] 3.4 Create Next.js middleware for session refresh and protected route redirection
- [x] 3.5 Implement sign-out action

## 4. Shared Layout (Header & Footer)

- [x] 4.1 Install shadcn/ui components needed for layout: Button, Avatar, DropdownMenu, Sheet (mobile menu)
- [x] 4.2 Create `components/layout/Header.tsx` with logo, nav links, and auth-aware user area
- [x] 4.3 Create `components/layout/Footer.tsx` with dark theme, links, and copyright
- [x] 4.4 Create mobile responsive hamburger menu in Header
- [x] 4.5 Update root `app/layout.tsx` to include Header and Footer with sticky footer behavior
- [x] 4.6 Add active link highlighting for current route

## 5. Homepage

- [x] 5.1 Install shadcn/ui components: Card, Input, Badge
- [x] 5.2 Create `components/home/Hero.tsx` with headline, subtitle, search bar, and CTA button
- [x] 5.3 Create `components/home/CourseCarousel.tsx` with horizontally scrollable course cards
- [x] 5.4 Create `components/home/CategoryGrid.tsx` with category cards grid
- [x] 5.5 Create `components/home/Features.tsx` with 3 feature/benefit cards
- [x] 5.6 Build homepage (`app/(public)/page.tsx`) composing all sections with data fetching from Supabase

## 6. Course Catalog

- [x] 6.1 Create `components/courses/CourseCard.tsx` with thumbnail, title, category badge, lesson count, duration
- [x] 6.2 Create `components/courses/CourseFilter.tsx` with search input and category filter tabs
- [x] 6.3 Build course listing page (`app/(public)/courses/page.tsx`) with search and category filtering via URL params
- [x] 6.4 Create `components/courses/LessonList.tsx` for ordered lesson display
- [x] 6.5 Build course detail page (`app/(public)/courses/[id]/page.tsx`) with course info, lesson list, and enroll button
- [x] 6.6 Implement enrollment action (server action to create enrollment record)

## 7. Study Plan

- [x] 7.1 Install shadcn/ui components: Dialog, Label, Textarea, Calendar/DatePicker
- [x] 7.2 Create `components/study-plan/PlanCard.tsx` showing plan title, target date, item count, completion %
- [x] 7.3 Create `components/study-plan/PlanForm.tsx` dialog for creating/editing plans
- [x] 7.4 Build study plan page (`app/(protected)/study-plan/page.tsx`) with plan listing and CRUD
- [x] 7.5 Implement add/remove course items within a plan
- [x] 7.6 Implement server actions for plan CRUD operations

## 8. Progress Tracking

- [x] 8.1 Install shadcn/ui components: Progress
- [x] 8.2 Implement lesson completion toggle (mark complete / mark incomplete) on course detail page
- [x] 8.3 Create server action to update progress_records and recalculate enrollment progress_pct
- [x] 8.4 Build progress dashboard page (`app/(protected)/progress/page.tsx`) with stats overview and per-course progress bars
- [x] 8.5 Create `components/progress/ActivityHistory.tsx` showing recent learning activities
- [x] 8.6 Create `components/progress/StreakBadge.tsx` showing consecutive learning days

## 9. Q&A System

- [x] 9.1 Create `components/qa/QuestionCard.tsx` showing title, author, date, answer count, course name
- [x] 9.2 Create `components/qa/QuestionForm.tsx` with title, body, optional course selector
- [x] 9.3 Build Q&A listing page (`app/(protected)/qa/page.tsx`) with question list and post form
- [x] 9.4 Create `components/qa/AnswerForm.tsx` for posting answers
- [x] 9.5 Build question detail view with answers list and answer form
- [x] 9.6 Implement delete own question/answer functionality

## 10. User Profile

- [x] 10.1 Build profile page (`app/(protected)/profile/page.tsx`) with avatar, name, email display
- [x] 10.2 Create `components/profile/EnrolledCourses.tsx` summary with progress bars
- [x] 10.3 Create `components/profile/Settings.tsx` with display name edit form
- [x] 10.4 Add sign-out button to profile page

## 11. Polish & Integration

- [x] 11.1 Update metadata (title, description) in root layout and per-page
- [x] 11.2 Add loading states (skeletons/spinners) for data-fetching pages
- [x] 11.3 Add error boundaries and 404 page for invalid course IDs
- [x] 11.4 Verify all protected routes redirect unauthenticated users correctly
- [x] 11.5 Test responsive layout across mobile, tablet, and desktop viewports
