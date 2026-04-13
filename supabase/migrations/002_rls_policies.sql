-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.study_plans enable row level security;
alter table public.study_plan_items enable row level security;
alter table public.progress_records enable row level security;
alter table public.questions enable row level security;
alter table public.answers enable row level security;

-- Profiles: anyone can read, only owner can update
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Categories: public read
create policy "Categories are viewable by everyone" on public.categories for select using (true);

-- Courses: public read
create policy "Courses are viewable by everyone" on public.courses for select using (true);

-- Lessons: public read
create policy "Lessons are viewable by everyone" on public.lessons for select using (true);

-- Enrollments: user can CRUD own
create policy "Users can view own enrollments" on public.enrollments for select using (auth.uid() = user_id);
create policy "Users can create own enrollments" on public.enrollments for insert with check (auth.uid() = user_id);
create policy "Users can update own enrollments" on public.enrollments for update using (auth.uid() = user_id);
create policy "Users can delete own enrollments" on public.enrollments for delete using (auth.uid() = user_id);

-- Study plans: user can CRUD own
create policy "Users can view own plans" on public.study_plans for select using (auth.uid() = user_id);
create policy "Users can create own plans" on public.study_plans for insert with check (auth.uid() = user_id);
create policy "Users can update own plans" on public.study_plans for update using (auth.uid() = user_id);
create policy "Users can delete own plans" on public.study_plans for delete using (auth.uid() = user_id);

-- Study plan items: user can CRUD own (via plan ownership)
create policy "Users can view own plan items" on public.study_plan_items for select
  using (exists (select 1 from public.study_plans where id = plan_id and user_id = auth.uid()));
create policy "Users can create own plan items" on public.study_plan_items for insert
  with check (exists (select 1 from public.study_plans where id = plan_id and user_id = auth.uid()));
create policy "Users can delete own plan items" on public.study_plan_items for delete
  using (exists (select 1 from public.study_plans where id = plan_id and user_id = auth.uid()));

-- Progress records: user can CRUD own
create policy "Users can view own progress" on public.progress_records for select using (auth.uid() = user_id);
create policy "Users can create own progress" on public.progress_records for insert with check (auth.uid() = user_id);
create policy "Users can delete own progress" on public.progress_records for delete using (auth.uid() = user_id);

-- Questions: authenticated can read all, author can insert/delete
create policy "Authenticated users can view questions" on public.questions for select using (auth.role() = 'authenticated');
create policy "Users can create questions" on public.questions for insert with check (auth.uid() = user_id);
create policy "Users can delete own questions" on public.questions for delete using (auth.uid() = user_id);

-- Answers: authenticated can read all, author can insert/delete
create policy "Authenticated users can view answers" on public.answers for select using (auth.role() = 'authenticated');
create policy "Users can create answers" on public.answers for insert with check (auth.uid() = user_id);
create policy "Users can delete own answers" on public.answers for delete using (auth.uid() = user_id);
