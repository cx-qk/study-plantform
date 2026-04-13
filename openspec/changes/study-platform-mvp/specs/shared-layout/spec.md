## ADDED Requirements

### Requirement: Header navigation bar
The system SHALL display a top header navigation bar on every page containing: the platform logo (linking to home), navigation links (Home, Courses, Study Plan, Progress, Q&A), and a user area (Login button or user avatar with dropdown).

#### Scenario: Unauthenticated user sees header
- **WHEN** an unauthenticated user views any page
- **THEN** the header displays the logo, navigation links, and a "Sign In" button

#### Scenario: Authenticated user sees header
- **WHEN** an authenticated user views any page
- **THEN** the header displays the logo, navigation links, and the user's avatar with a dropdown menu (Profile, Sign Out)

#### Scenario: Active link highlighting
- **WHEN** a user is on a specific page
- **THEN** the corresponding navigation link in the header SHALL be visually highlighted

### Requirement: Responsive header
The header navigation SHALL be responsive. On mobile viewports, navigation links SHALL collapse into a hamburger menu.

#### Scenario: Mobile viewport
- **WHEN** the viewport width is below the mobile breakpoint
- **THEN** navigation links are hidden behind a hamburger menu icon that toggles a mobile menu

### Requirement: Dark footer
The system SHALL display a dark-themed footer on every page containing: navigation links (About Us, Contact Us, Help Center, Terms of Service, Privacy Policy), copyright text with current year, and social media icon links.

#### Scenario: Footer displays on all pages
- **WHEN** a user views any page
- **THEN** a dark-themed footer is visible at the bottom with links and copyright information

#### Scenario: Footer links
- **WHEN** a user views the footer
- **THEN** links for About Us, Contact Us, Help Center, Terms of Service, and Privacy Policy SHALL be displayed

### Requirement: Root layout structure
The root layout SHALL wrap all pages with the Header at the top and Footer at the bottom, with page content in between occupying the remaining vertical space.

#### Scenario: Page content fills viewport
- **WHEN** a page has minimal content
- **THEN** the footer remains at the bottom of the viewport (sticky footer behavior) and the content area fills the remaining space
