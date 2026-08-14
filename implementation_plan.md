# Implementation Plan: Google OAuth Password Change Restriction

## Overview
Restrict password modification on the `/account/security` page based on the user's authentication provider (`google` vs `credentials`). 
- If the user is logged in via **Google**, display an informational card indicating that their account is managed through Google OAuth and disable the password change form.
- If the user is logged in via **Email/Password** (`credentials`), render the password change dialog/form.

---

## User Requirements
1. **Google Logged-in Users**: Hide/disable password modification form on `/account/security` and display a clear message stating that they are logged in through Google.
2. **Email/Password Logged-in Users**: Display the "Change current password" form allowing them to update their password.

---

## Proposed Changes

### 1. `app/account/security/page.js` (Client Page)
- Import `useSession` from `next-auth/react`.
- Check `session?.user?.provider`:
  - **Loading State**: Display a loading spinner/skeleton while session is resolving.
  - **Google Provider (`provider === "google"`)**: Render an alert/card stating:
    - *"Logged in via Google"*
    - *"Your account uses Google Authentication. Password changes and security settings are managed through your Google Account."*
  - **Credentials Provider (`provider === "credentials"`)**: Render the password change form (Current Password, New Password, Confirm Password).
- Fix the form submission handler (`onSubmit={handleChangePassword}`).

### 2. `app/api/account/security/route.js` (API Endpoint)
- Update session fetching to use `auth()` from `@/auth` consistent with the App Router / NextAuth v5 setup.
- Add backend check for `user.provider === "google"` and return `400 Bad Request` ("Password changes are not allowed for Google authenticated accounts").

---

## Verification Plan

### Manual / UI Verification
1. **Google Account Test**: Log in with Google, navigate to `/account/security`, verify that password change form is replaced with the Google authentication message.
2. **Credentials Account Test**: Log in with Email & Password, navigate to `/account/security`, verify that the password change form is displayed and functional.
3. **API Defense Test**: Verify that direct POST requests to `/api/account/security` for Google accounts return a 400 error.

### Build Verification
- Execute `npm run build` or Next.js lint/type check to ensure no compilation or syntax issues.
