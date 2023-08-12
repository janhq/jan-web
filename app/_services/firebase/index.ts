import { initializeApp } from "firebase/app";
import firebaseConfigs from "./firebase_configs.json";
import { getAuth, User } from "firebase/auth";

// Initialize firebase with configrurations
const app = initializeApp(firebaseConfigs);

// Firebase authentication
const firebaseAuth = getAuth(app);

// Returns current user from firebase auth
function getCurrentUser(): User | null {
  return firebaseAuth.currentUser;
}

// Retuns firebase token from current user profile
async function getFirebaseToken() {
  return firebaseAuth.authStateReady().then(async () => {
    let user = firebaseAuth.currentUser;
    // If user is already signed in, return their token
    if (user) {
      return user.getIdToken();
    }
    return undefined
  });
}

export { firebaseAuth, getCurrentUser, getFirebaseToken };
