## ADDED Requirements

### Requirement: Profile page
The system SHALL display a user profile page at `/profile` showing the user's avatar, display name, and email (from their Google account).

#### Scenario: View profile
- **WHEN** an authenticated user navigates to `/profile`
- **THEN** their avatar, name, and email are displayed

### Requirement: Enrolled courses summary
The profile page SHALL display a summary of the user's enrolled courses with progress indicators.

#### Scenario: Courses summary with enrollments
- **WHEN** a user with enrollments views their profile
- **THEN** a list of enrolled courses with progress bars is displayed

#### Scenario: No enrollments
- **WHEN** a user with no enrollments views their profile
- **THEN** a message with a link to browse courses is displayed

### Requirement: Profile settings
The profile page SHALL allow users to update their display name.

#### Scenario: Update display name
- **WHEN** a user edits their display name and saves
- **THEN** the profile is updated and the new name is reflected in the header

### Requirement: Sign out from profile
The profile page SHALL include a "Sign Out" button.

#### Scenario: Sign out
- **WHEN** a user clicks "Sign Out" on the profile page
- **THEN** the session is cleared and the user is redirected to the homepage
