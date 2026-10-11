My name is Aisha Niyonsaba.

- **Registration number:** 2527104
- **App name:** LaviPortfolio
- **Verification code:** MOB-A2-7104
- **Android package:** `rw.ac.ines.ug2527104.laviportfolio`
- **GitHub:** https://github.com/lavi041

## Purpose
LaviPortfolio is my personal portfolio for internship and job opportunities. A recruiter can install the APK, open it without Expo Go, and understand my profile within two minutes. It works fully offline.

## Features
1. **Home**: "My name is Aisha Niyonsaba.", profile picture or avatar, headline, short biography, availability and verification code.
2. **Skills and education**: five skill groups built from reusable chip and card components, plus an education and training timeline.
3. **Projects**: three projects, each with a separate detail screen (problem, my contribution, technology).
4. **Profile editor**: controlled fields for headline, biography, primary skill and availability, with field-level validation (required, length limits, skill format). Invalid saves are blocked.
5. **Navigation**: bottom tabs plus a nested stack for Project Details.
6. **Profile media**: take a photo or choose from the gallery, with preview, replace, remove, permission-denied and cancellation feedback.
7. **Local persistence**: AsyncStorage keeps the profile and the picture reference after the app is closed and reopened. "Reset to defaults" clears it.
8. **Offline behaviour**: everything works in Airplane Mode. The GitHub link on About is labelled as needing internet.
9. **About**: app name, student name, registration number, verification code, version and data-use statement.
10. **Standalone Android release**: APK built with EAS Build (preview profile).

## Setup and run
```bash
npm install
npx expo start        # development only (Expo Go is NOT the submitted release)
npx tsc --noEmit      # type check
```

## Build the APK (EAS)
```bash
npm install -g eas-cli
eas login
eas build:configure   # only if asked
eas build -p android --profile preview
```
Download the finished `.apk` from the link EAS prints, rename it to `MOB_A2_2527104.apk`, install it on the phone and test it.

## Project structure
```
App.tsx
src/components   reusable UI (Screen, Card, Chip, Avatar, AppButton, FormField, TimelineItemView, EmptyState)
src/screens      Home, Skills, Projects, ProjectDetails, ProfileEditor, About
src/navigation   bottom tabs and Projects stack
src/storage      AsyncStorage helpers and ProfileContext
src/utils        validation rules
src/data         portfolio content
docs/            UI and UX PDF
evidence/        test log, declaration, AI_USE.md
```

## Release details (fill in after building and testing)
- **Tested device:** Samsung Galaxy A05 (SM-A055F/DS)
- **Android version:** Android 15
- **Final commit hash:** 1a9bdbc60f2ae859850b1c6342179ea5f67be389
- **Release link:** https://github.com/lavi041/MOB_A2_2527104/releases/tag/v1.0.0
- **APK link:** https://github.com/lavi041/MOB_A2_2527104/releases/download/v1.0.0/MOB_A2_2527104.apk

## Known limitations
- The profile picture is stored as a reference to the picked image on the phone. If the phone's cache is cleared or the image is deleted, the avatar with initials is shown instead.
- The portfolio content (skills, education, projects) is fixed in the source code; only headline, biography, primary skill, availability and picture are editable in the app.
- Android only. Not tested on iOS or web.
- Opening the GitHub profile requires an internet connection.

## Acknowledgements
Built with React Native, Expo, TypeScript, React Navigation, expo-image-picker and @react-native-async-storage/async-storage. See `evidence/AI_USE.md` for AI-assistance disclosure.
