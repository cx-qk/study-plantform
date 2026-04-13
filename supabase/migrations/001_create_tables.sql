-- Profiles table (linked to auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  email text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Categories table
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text unique not null,
  icon text,
  created_at timestamptz default now()
);

-- Courses table
create table public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  thumbnail_url text,
  category_id uuid references public.categories on delete set null,
  duration_minutes integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Lessons table
create table public.lessons (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references public.courses on delete cascade not null,
  title text not null,
  content text,
  "order" integer not null,
  duration_minutes integer default 0,
  created_at timestamptz default now()
);

-- Enrollments table
create table public.enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  course_id uuid references public.courses on delete cascade not null,
  progress_pct integer default 0,
  created_at timestamptz default now(),
  unique (user_id, course_id)
);

-- Study plans table
create table public.study_plans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  title text not null,
  description text,
  target_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Study plan items table
create table public.study_plan_items (
  id uuid default gen_random_uuid() primary key,
  plan_id uuid references public.study_plans on delete cascade not null,
  course_id uuid references public.courses on delete cascade not null,
  created_at timestamptz default now()
);

-- Progress records table
create table public.progress_records (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  lesson_id uuid references public.lessons on delete cascade not null,
  course_id uuid references public.courses on delete cascade not null,
  completed_at timestamptz default now(),
  unique (user_id, lesson_id)
);

-- Questions table
create table public.questions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  course_id uuid references public.courses on delete set null,
  title text not null,
  body text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Answers table
create table public.answers (
  id uuid default gen_random_uuid() primary key,
  question_id uuid references public.questions on delete cascade not null,
  user_id uuid references public.profiles on delete cascade not null,
  body text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
