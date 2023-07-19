import { initializeApp } from "firebase/app";
import firebaseConfigs from "./firebase_configs.json";
import { getAuth, signInAnonymously, User } from "firebase/auth";

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
  let token = getCurrentUser()?.getIdToken();
  if (token === undefined || token === null) {
    let anonyAccount = await signInAnonymously(firebaseAuth);
    token = anonyAccount.user.getIdToken();
  }
}

export { firebaseAuth, getCurrentUser, getFirebaseToken };
