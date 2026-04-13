## ADDED Requirements

### Requirement: Study plan listing
The system SHALL display all of the authenticated user's study plans at `/study-plan`. Each plan card SHALL show the plan title, target date, number of items, and completion percentage.

#### Scenario: User views their plans
- **WHEN** an authenticated user navigates to `/study-plan`
- **THEN** all their study plans are displayed as cards

#### Scenario: No plans exist
- **WHEN** an authenticated user has no study plans
- **THEN** the page displays an empty state with a prompt to create a plan

### Requirement: Create study plan
The system SHALL allow users to create a new study plan with a title, description, and target date via a form dialog.

#### Scenario: Create a new plan
- **WHEN** a user fills in the plan form and submits
- **THEN** a new study plan is created and appears in the list

#### Scenario: Validation
- **WHEN** a user submits the form with an empty title
- **THEN** the form displays a validation error and does not submit

### Requirement: Study plan items
Each study plan SHALL contain items that reference enrolled courses. Users SHALL be able to add and remove items from a plan.

#### Scenario: Add course to plan
- **WHEN** a user adds an enrolled course to a study plan
- **THEN** the course appears as an item in the plan

#### Scenario: Remove item from plan
- **WHEN** a user removes an item from a study plan
- **THEN** the item is deleted and no longer appears in the plan

### Requirement: Edit and delete study plan
The system SHALL allow users to edit a plan's title, description, and target date, and to delete a plan entirely.

#### Scenario: Edit plan
- **WHEN** a user edits a plan's details and saves
- **THEN** the plan is updated with the new information

#### Scenario: Delete plan
- **WHEN** a user deletes a study plan
- **THEN** the plan and all its items are removed
