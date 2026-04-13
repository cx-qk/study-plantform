## ADDED Requirements

### Requirement: Lesson completion
The system SHALL allow authenticated users to mark a lesson as completed from the course detail page. Completing a lesson SHALL update the enrollment's progress percentage.

#### Scenario: Mark lesson complete
- **WHEN** a user clicks "Mark as Complete" on a lesson
- **THEN** the lesson is recorded as completed and the course progress bar updates

#### Scenario: Unmark lesson
- **WHEN** a user clicks "Mark as Incomplete" on a previously completed lesson
- **THEN** the completion record is removed and the progress bar decreases

### Requirement: Progress dashboard
The system SHALL display a progress dashboard at `/progress` showing the user's overall learning statistics and per-course progress.

#### Scenario: Dashboard overview
- **WHEN** an authenticated user navigates to `/progress`
- **THEN** the page displays: total enrolled courses, total completed lessons, overall completion percentage, and a list of enrolled courses with individual progress bars

#### Scenario: No enrollments
- **WHEN** a user with no enrollments views the progress page
- **THEN** an empty state is shown with a prompt to browse courses

### Requirement: Activity history
The progress page SHALL display a chronological list of recent learning activities (e.g., "Completed Lesson X in Course Y").

#### Scenario: Activity list
- **WHEN** a user views the progress page
- **THEN** a list of recent activity entries is shown, ordered newest first

#### Scenario: No activity
- **WHEN** a user has no activity records
- **THEN** a message indicating no activity yet is displayed

### Requirement: Learning streak
The system SHALL track consecutive days of learning activity and display the current streak on the progress page.

#### Scenario: Active streak
- **WHEN** a user has completed at least one lesson on each of the last N consecutive days
- **THEN** the progress page shows a streak badge with the count N

#### Scenario: Broken streak
- **WHEN** a user has a gap of one or more days without activity
- **THEN** the streak resets to 0 or the count since the last active day
