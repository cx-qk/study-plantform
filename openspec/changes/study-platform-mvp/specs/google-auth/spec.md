## ADDED Requirements

### Requirement: Google OAuth sign-in
The system SHALL provide a "Sign in with Google" button on the login page that initiates the Google OAuth flow via Supabase Auth. No other authentication methods SHALL be supported.

#### Scenario: Successful Google sign-in
- **WHEN** user clicks "Sign in with Google" on the login page
- **THEN** the system redirects to Google's OAuth consent screen, and upon approval, redirects back to the app with an authenticated session

#### Scenario: First-time sign-in creates profile
- **WHEN** a user signs in with Google for the first time
- **THEN** the system SHALL automatically create a profile record with the user's name, email, and avatar URL from their Google account

#### Scenario: Returning user sign-in
- **WHEN** a user who has previously signed in completes Google OAuth
- **THEN** the system SHALL restore their existing session and redirect to the homepage

### Requirement: OAuth callback handling
The system SHALL handle the Supabase OAuth callback at `/auth/callback` to exchange the authorization code for a session.

#### Scenario: Valid callback
- **WHEN** Supabase redirects to `/auth/callback` with a valid authorization code
- **THEN** the system exchanges the code for a session and redirects the user to the homepage

#### Scenario: Invalid callback
- **WHEN** the callback receives an invalid or expired code
- **THEN** the system redirects the user to the login page with an error indicator

### Requirement: Session management
The system SHALL maintain user sessions using Supabase Auth cookies managed via `@supabase/ssr`. Sessions SHALL persist across page refreshes and browser restarts until explicitly signed out.

#### Scenario: Authenticated page access
- **WHEN** an authenticated user navigates to any page
- **THEN** the session is available in both server and client components

#### Scenario: Session expiry refresh
- **WHEN** a user's session token expires but the refresh token is valid
- **THEN** the system SHALL automatically refresh the session without user interaction

### Requirement: Protected route middleware
The system SHALL use Next.js middleware to protect routes that require authentication. Protected routes: `/study-plan`, `/progress`, `/qa`, `/profile`.

#### Scenario: Unauthenticated access to protected route
- **WHEN** an unauthenticated user navigates to a protected route
- **THEN** the system redirects them to `/login`

#### Scenario: Authenticated access to protected route
- **WHEN** an authenticated user navigates to a protected route
- **THEN** the page renders normally

### Requirement: Sign out
The system SHALL provide a sign-out action accessible from the header navigation that clears the session and redirects to the homepage.

#### Scenario: User signs out
- **WHEN** user clicks "Sign Out" from the profile dropdown in the header
- **THEN** the session is cleared, and the user is redirected to the homepage
