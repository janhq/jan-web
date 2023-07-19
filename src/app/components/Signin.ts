import { GoogleAuthProvider } from "firebase/auth";
import { firebaseAuth } from "../../services/firebase";

// Authentication with Goolgle account
export const googleAuthProvider = new GoogleAuthProvider();
