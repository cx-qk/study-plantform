## ADDED Requirements

### Requirement: Question listing
The system SHALL display a list of all questions at `/qa`, ordered by newest first. Each question card SHALL show the title, author name, creation date, answer count, and optionally the associated course name.

#### Scenario: View all questions
- **WHEN** an authenticated user navigates to `/qa`
- **THEN** all questions are displayed in reverse chronological order

#### Scenario: No questions exist
- **WHEN** there are no questions
- **THEN** an empty state with a prompt to ask the first question is displayed

### Requirement: Post a question
The system SHALL allow authenticated users to post a new question with a title, body text, and an optional course association.

#### Scenario: Post question
- **WHEN** a user fills in the question form and submits
- **THEN** a new question is created and appears at the top of the list

#### Scenario: Post question linked to a course
- **WHEN** a user selects a course from a dropdown while posting a question
- **THEN** the question is associated with that course and displays the course name

### Requirement: Question detail and answers
The system SHALL display a question detail view showing the full question text and all answers below it, ordered by creation date.

#### Scenario: View question detail
- **WHEN** a user clicks on a question card
- **THEN** the full question and all its answers are displayed

#### Scenario: Post an answer
- **WHEN** an authenticated user submits an answer on a question detail view
- **THEN** the answer appears in the answer list and the answer count increments

### Requirement: Author can delete own content
The system SHALL allow users to delete their own questions and answers.

#### Scenario: Delete own question
- **WHEN** a user deletes their own question
- **THEN** the question and all its answers are removed

#### Scenario: Delete own answer
- **WHEN** a user deletes their own answer
- **THEN** the answer is removed and the answer count decrements
