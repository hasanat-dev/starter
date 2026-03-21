# Hasanat Data Policy for Builders

This document defines the data handling rules for apps hosted on or listed by hasanat.dev.

By submitting an app to hasanat.dev, you agree to these principles.

## Platform Data

**auth.hasanat.dev** provides shared authentication. When a user signs in to your app via auth.hasanat.dev, your app receives:

- User ID
- Display name
- Email address
- Profile image URL

### What you MAY do

- Use the user ID to associate data within your app
- Display the user's name and image in your app's UI
- Store session state (e.g., preferences, progress) tied to the user ID

### What you MUST NOT do

- Store the user's email or image in your own database unless your app requires it and you disclose this
- Share user data with third parties
- Sell, trade, or monetize user data in any form
- Use user data for advertising or tracking beyond your app
- Contact users for marketing unless they explicitly opt in within your app

## Your App's Data

If your app collects data beyond what auth.hasanat.dev provides (e.g., user-generated content, form submissions, uploaded files):

1. **Disclose it** — When submitting your app to hasanat.dev, describe what additional data you collect in the "Additional data collected" field
2. **Minimize it** — Only collect what your app needs to function
3. **Secure it** — Use parameterized queries, validate inputs, use HTTPS
4. **Respect deletion** — If a user asks to delete their data, comply within 30 days

## App Removal

hasanat.dev reserves the right to revoke subdomain access and remove app listings if an app:

- Violates user trust or this data policy
- Collects data beyond what was disclosed
- Contains malicious code or deceptive practices
- Becomes abandoned and unresponsive for 90+ days

## Privacy Notice

Each app should include a brief privacy notice accessible from its UI (footer link is sufficient). This can be as simple as:

> "This app uses auth.hasanat.dev for authentication. [Describe any additional data collection, or state 'No additional data is collected beyond your sign-in profile.']"

For apps with significant data collection, a full privacy policy is recommended.

## Changes

This policy may be updated. Builders will be notified of material changes via their hasanat.dev account email.

---

Questions? Reach out at [hasanat.dev](https://hasanat.dev).
