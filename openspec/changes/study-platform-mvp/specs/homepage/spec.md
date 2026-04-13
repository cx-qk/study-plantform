## ADDED Requirements

### Requirement: Hero section
The homepage SHALL display a hero section at the top with a headline ("Learn Without Limits" or similar), a subtitle describing the platform, a search input for searching courses, and a primary CTA button ("Get Started for Free").

#### Scenario: Hero displays on homepage
- **WHEN** a user visits the homepage
- **THEN** the hero section is prominently displayed with headline, subtitle, search bar, and CTA

#### Scenario: Hero search navigates to courses
- **WHEN** a user types a query in the hero search bar and submits
- **THEN** the system navigates to `/courses?q=<query>` with the search pre-filled

#### Scenario: CTA button behavior for unauthenticated user
- **WHEN** an unauthenticated user clicks the CTA button
- **THEN** the system navigates to the login page

#### Scenario: CTA button behavior for authenticated user
- **WHEN** an authenticated user clicks the CTA button
- **THEN** the system navigates to the courses page

### Requirement: Popular courses section
The homepage SHALL display a "Popular Courses" section with a horizontally scrollable row of course cards. Each card SHALL show the course thumbnail, title, category badge, and lesson count.

#### Scenario: Popular courses display
- **WHEN** a user views the homepage
- **THEN** a "Popular Courses" section shows up to 8 course cards in a scrollable row

#### Scenario: Course card click
- **WHEN** a user clicks on a course card
- **THEN** the system navigates to `/courses/<course-id>`

### Requirement: Browse by category section
The homepage SHALL display a "Browse by Category" section with a grid of category cards. Each card SHALL show a category icon and name.

#### Scenario: Category grid display
- **WHEN** a user views the homepage
- **THEN** a grid of category cards is displayed

#### Scenario: Category click
- **WHEN** a user clicks on a category card
- **THEN** the system navigates to `/courses?category=<category-name>`

### Requirement: Features/benefits section
The homepage SHALL display a "Why Choose Us" section with 3 feature cards highlighting platform benefits (e.g., Structured Study Plans, Track Progress, Ask & Discuss).

#### Scenario: Features section display
- **WHEN** a user views the homepage
- **THEN** three feature cards with icons, titles, and descriptions are displayed
