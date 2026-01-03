# Firebase & Authentication Setup Guide

## Overview

CodeKeybr now includes:
- ✅ **Vercel Analytics** - Track user engagement
- ✅ **Google Authentication** - Sign in with Google
- ✅ **User Profiles** - Persistent user data storage
- ✅ **Real Leaderboard** - Based on actual user performance

---

## Prerequisites

1. A Firebase account (free tier works fine)
2. A Vercel account (for deploying with analytics)

---

## Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `codekeybr` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click **"Create project"**

### Step 2: Enable Google Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Google** provider
3. Toggle **Enable**
4. Select a support email
5. Click **Save**

### Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll configure rules next)
4. Choose a location closest to your users
5. Click **Enable**

### Step 4: Configure Firestore Rules

In Firestore Database → **Rules**, paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read all, but only write their own
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Completions collection - users can read all, but only create their own
    match /completions/{completionId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if false;
    }
  }
}
```

Click **Publish** to save the rules.

### Step 5: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **"Your apps"** section
3. Click the **Web** icon (`</>`) to add a web app
4. Register app name: `codekeybr-web`
5. **Don't** check "Also set up Firebase Hosting"
6. Click **Register app**
7. Copy the `firebaseConfig` object values

### Step 6: Configure Environment Variables

1. In your project root, create a `.env` file (or copy from `.env.example`):

```bash
cp .env.example .env
```

2. Fill in your Firebase values:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

---

## Vercel Analytics Setup

### For Development (Local)

Analytics are automatically included when you run `npm run dev`. They will only send data in production.

### For Production (Vercel Deployment)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and sign in
3. Click **"New Project"**
4. Import your GitHub repository
5. Add your environment variables in **Project Settings** → **Environment Variables**
6. Deploy!

Vercel Analytics will automatically be enabled for your production deployment.

---

## Testing the Integration

### 1. Start Development Server

```bash
npm run dev
```

### 2. Test Authentication

1. Click **"Sign In"** in the navbar
2. Sign in with your Google account
3. You should see your profile picture and name in the navbar

### 3. Test Problem Completion

1. Go to **Problems** and select a problem
2. Complete typing the problem
3. Your stats will be automatically saved to Firestore

### 4. Test Leaderboard

1. Click **"Leaderboard"** in the navbar
2. You should see your profile in the leaderboard
3. Complete more problems to see your stats update

---

## Database Structure

### Users Collection (`users/{userId}`)

```typescript
{
  uid: string;              // User ID from Firebase Auth
  email: string;            // User's email
  displayName: string;      // User's display name
  photoURL: string | null;  // Profile picture URL
  totalProblems: number;    // Total problems completed
  avgWpm: number;          // Average WPM across all problems
  avgAccuracy: number;     // Average accuracy percentage
  lastUpdated: number;     // Timestamp of last update
}
```

### Completions Collection (`completions/{completionId}`)

```typescript
{
  userId: string;        // Reference to user
  problemId: string;     // Problem ID
  wpm: number;          // Words per minute
  accuracy: number;     // Accuracy percentage
  mistakes: number;     // Number of mistakes
  timeSpent: number;    // Time in seconds
  completedAt: number;  // Timestamp
}
```

---

## Troubleshooting

### Authentication Errors

**Error: "Firebase: Error (auth/unauthorized-domain)"**
- Solution: In Firebase Console → Authentication → Settings → Authorized domains
- Add your domain (e.g., `localhost` for local dev, `your-app.vercel.app` for production)

### Firestore Permission Errors

**Error: "Missing or insufficient permissions"**
- Solution: Check your Firestore rules (see Step 4)
- Make sure you're signed in when testing

### Environment Variables Not Working

- Make sure you restart your dev server after changing `.env`
- Verify variable names start with `VITE_` (required for Vite)
- Don't commit `.env` to git (it's in `.gitignore`)

---

## Security Notes

1. **Never commit your `.env` file** - It's already in `.gitignore`
2. **Use different Firebase projects** for development and production
3. **Review Firestore rules** carefully before deploying to production
4. **Rotate API keys** if they're ever exposed

---

## Features

### Authentication
- ✅ Google Sign-In
- ✅ Persistent sessions
- ✅ Automatic profile creation
- ✅ Profile picture display

### Leaderboard
- ✅ Real-time user rankings
- ✅ Average WPM sorting
- ✅ Show top 10 users
- ✅ Highlight current user
- ✅ Display user rank if outside top 10

### Stats Tracking
- ✅ Automatic stat saving after problem completion
- ✅ Running average calculations
- ✅ Problem completion history
- ✅ Anonymous users can still practice (stats not saved)

---

## Next Steps

1. Complete the Firebase setup above
2. Test authentication locally
3. Complete a few problems to populate the leaderboard
4. Deploy to Vercel for production
5. Share with friends and start competing! 🚀

---

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your Firebase configuration
3. Check Firestore rules
4. Ensure environment variables are set correctly

Happy typing! 💻⚡
