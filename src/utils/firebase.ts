import { initializeApp } from "firebase/app";
import firebaseConfigs from "@/services/firebase/firebase_configs.json";

export const firebaseApp = initializeApp(firebaseConfigs);
