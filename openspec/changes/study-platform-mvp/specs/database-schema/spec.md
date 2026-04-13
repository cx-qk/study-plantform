## ADDED Requirements

### Requirement: Profiles table
The system SHALL maintain a `profiles` table with columns: `id` (UUID, references auth.users), `display_name` (text), `email` (text), `avatar_url` (text), `created_at` (timestamptz), `updated_at` (timestamptz). A profile row SHALL be auto-created via a database trigger when a new user signs up.

#### Scenario: Profile auto-creation on signup
- **WHEN** a new user completes Google OAuth
- **THEN** a row in `profiles` is created with data from their Google account

#### Scenario: Profile RLS
- **WHEN** any user queries the profiles table
- **THEN** all profiles are readable (for displaying author names), but only the owner can update their own profile

### Requirement: Categories table
The system SHALL maintain a `categories` table with columns: `id` (UUID), `name` (text, unique), `icon` (text), `created_at` (timestamptz).

#### Scenario: Public read access
- **WHEN** any user (authenticated or not) queries categories
- **THEN** all categories are returned

### Requirement: Courses table
The system SHALL maintain a `courses` table with columns: `id` (UUID), `title` (text), `description` (text), `thumbnail_url` (text), `category_id` (UUID, references categories), `duration_minutes` (integer), `created_at` (timestamptz), `updated_at` (timestamptz).

#### Scenario: Public read access
- **WHEN** any user queries courses
- **THEN** all courses are returned

### Requirement: Lessons table
The system SHALL maintain a `lessons` table with columns: `id` (UUID), `course_id` (UUID, references courses), `title` (text), `content` (text), `order` (integer), `duration_minutes` (integer), `created_at` (timestamptz).

#### Scenario: Public read access
- **WHEN** any user queries lessons
- **THEN** all lessons are returned

#### Scenario: Ordered by position
- **WHEN** lessons for a course are queried
- **THEN** they are returned ordered by the `order` column ascending

### Requirement: Enrollments table
The system SHALL maintain an `enrollments` table with columns: `id` (UUID), `user_id` (UUID, references profiles), `course_id` (UUID, references courses), `progress_pct` (integer, default 0), `created_at` (timestamptz). A unique constraint SHALL exist on (`user_id`, `course_id`).

#### Scenario: RLS policy
- **WHEN** a user queries enrollments
- **THEN** only their own enrollment records are returned

#### Scenario: Insert own enrollment
- **WHEN** an authenticated user enrolls in a course
- **THEN** an enrollment row is created with their user_id

### Requirement: Study plans table
The system SHALL maintain a `study_plans` table with columns: `id` (UUID), `user_id` (UUID, references profiles), `title` (text), `description` (text), `target_date` (date), `created_at` (timestamptz), `updated_at` (timestamptz).

#### Scenario: RLS policy
- **WHEN** a user queries study_plans
- **THEN** only their own plans are returned

### Requirement: Study plan items table
The system SHALL maintain a `study_plan_items` table with columns: `id` (UUID), `plan_id` (UUID, references study_plans), `course_id` (UUID, references courses), `created_at` (timestamptz).

#### Scenario: RLS policy
- **WHEN** a user queries study_plan_items
- **THEN** only items belonging to their own plans are returned

### Requirement: Progress records table
The system SHALL maintain a `progress_records` table with columns: `id` (UUID), `user_id` (UUID, references profiles), `lesson_id` (UUID, references lessons), `course_id` (UUID, references courses), `completed_at` (timestamptz). A unique constraint SHALL exist on (`user_id`, `lesson_id`).

#### Scenario: RLS policy
- **WHEN** a user queries progress_records
- **THEN** only their own records are returned

### Requirement: Questions table
The system SHALL maintain a `questions` table with columns: `id` (UUID), `user_id` (UUID, references profiles), `course_id` (UUID, nullable, references courses), `title` (text), `body` (text), `created_at` (timestamptz), `updated_at` (timestamptz).

#### Scenario: Read access
- **WHEN** any authenticated user queries questions
- **THEN** all questions are returned

#### Scenario: Write access
- **WHEN** a user creates or deletes a question
- **THEN** only the author can delete their own questions

### Requirement: Answers table
The system SHALL maintain an `answers` table with columns: `id` (UUID), `question_id` (UUID, references questions), `user_id` (UUID, references profiles), `body` (text), `created_at` (timestamptz), `updated_at` (timestamptz).

#### Scenario: Read access
- **WHEN** any authenticated user queries answers
- **THEN** all answers are returned

#### Scenario: Write access
- **WHEN** a user creates or deletes an answer
- **THEN** only the author can delete their own answers
