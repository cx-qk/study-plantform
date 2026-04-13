## ADDED Requirements

### Requirement: Course listing page
The system SHALL display a course listing page at `/courses` showing all available courses as cards in a responsive grid. Each card SHALL display the course thumbnail, title, category badge, lesson count, and estimated duration.

#### Scenario: All courses displayed
- **WHEN** a user navigates to `/courses`
- **THEN** all courses are displayed as cards in a responsive grid

#### Scenario: Empty state
- **WHEN** there are no courses in the database
- **THEN** the page displays an empty state message

### Requirement: Course search
The system SHALL provide a search input on the courses page that filters courses by title in real time.

#### Scenario: Search filters courses
- **WHEN** a user types in the search input
- **THEN** only courses whose title contains the search query are displayed

#### Scenario: URL query parameter pre-fills search
- **WHEN** a user navigates to `/courses?q=javascript`
- **THEN** the search input is pre-filled with "javascript" and results are filtered accordingly

### Requirement: Category filter
The system SHALL provide category filter buttons/tabs on the courses page to filter courses by category. An "All" option SHALL show all courses.

#### Scenario: Filter by category
- **WHEN** a user selects a category filter
- **THEN** only courses in that category are displayed

#### Scenario: URL query parameter pre-selects category
- **WHEN** a user navigates to `/courses?category=programming`
- **THEN** the "programming" category filter is pre-selected

### Requirement: Course detail page
The system SHALL display a course detail page at `/courses/[id]` showing the course title, description, thumbnail, category, total duration, lesson count, and an ordered list of lessons.

#### Scenario: Course detail renders
- **WHEN** a user navigates to `/courses/<valid-id>`
- **THEN** the course detail page displays all course information and its lessons list

#### Scenario: Invalid course ID
- **WHEN** a user navigates to `/courses/<invalid-id>`
- **THEN** the system displays a 404 page

### Requirement: Course enrollment
The system SHALL allow authenticated users to enroll in a course from the course detail page. The enrollment action SHALL create an enrollment record with 0% progress.

#### Scenario: Enroll in course
- **WHEN** an authenticated user clicks "Enroll" on a course they have not enrolled in
- **THEN** the system creates an enrollment record and the button changes to "Continue Learning"

#### Scenario: Already enrolled
- **WHEN** an authenticated user views a course they are already enrolled in
- **THEN** the "Enroll" button shows "Continue Learning" instead

#### Scenario: Unauthenticated enrollment attempt
- **WHEN** an unauthenticated user clicks "Enroll"
- **THEN** the system redirects to the login page
