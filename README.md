# BookDrive

A Minibus Booking System built with React Native (Expo). Passengers request rides; drivers view and accept requests; bookings progress from request to completion.

## Brand

| | |
|---|---|
| **App name** | BookDrive |
| **Primary color** | `#121212` (Off-Black) |
| **Secondary color** | `#FF6B00` (Safety Orange) |
| Design tokens live in [`src/constants/theme.ts`](./src/constants/theme.ts) |

## Tech Stack

- [Expo](https://expo.dev) SDK 54 (React Native, TypeScript template)
- [React Navigation](https://reactnavigation.org) — native stack
- [i18next](https://www.i18next.com) / [react-i18next](https://react.i18next.com) / [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization/) — internationalization
- [Husky](https://typicode.github.io/husky) — git hooks (pre-commit type-check)

> **Note:** This project is pinned to Expo SDK 54. Make sure everyone on the team has an Expo Go app matching SDK 54 installed (check via `expo.dev/go` if the Play/App Store version lags). If your team decides to move to a newer SDK, everyone needs to upgrade Expo Go together — a version mismatch is the most common reason the app fails to open on a phone.

## Folder Structure

```
src/
  components/     # Reusable, presentational UI components
  screens/        # One folder per screen (Splash, Login, SignUp, Home,
                  # Booking, BookingHistory, BookingDetails,
                  # DriverRequests, Profile, Settings)
  navigation/      # RootNavigator and route param types
  services/        # Business-logic layer (bookingService, authService, ...)
  hooks/           # Reusable custom hooks
  context/         # React context providers (AuthContext, ...)
  constants/       # Theme tokens, app-wide constants
  utils/           # Pure helper functions
  localization/    # i18next config + locale JSON files
  types/           # Shared TypeScript types
  api/             # Low-level API client (fetch wrapper / Firebase)
assets/            # Images, fonts, icons
```

## Getting Started

```bash
# install dependencies
npm install

# start the Expo dev server
npm start

# platform-specific
npm run android
npm run ios
npm run web
```

Scan the QR code with the Expo Go app, or run on a simulator/emulator.

## Git Hooks

Husky runs a `pre-commit` hook (`npx tsc --noEmit`) to catch type errors before they're committed. It's installed automatically via the `prepare` script when you run `npm install`.

## Internationalization

Locale files live in `src/localization/locales/` (currently `en.json` and `fr.json`). Add a new language by dropping in another JSON file with the same keys and registering it in `src/localization/i18n.ts`.

## Roadmap / Bonus

- [ ] Firebase Authentication (phone number preferred, email/password acceptable)
- [ ] Wire `bookingService` to a real backend
- [ ] Push notifications for booking status changes

## Deliverables Checklist

- [ ] Stitch design link: _add link here_
- [ ] GitHub repository: _add link here_
- [ ] Expo project (this repo)
- [ ] README (this file)
- [ ] 2–5 minute demo video: _add link here_

## Team

Add your team name, members, and roles here.
