import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGEBUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
} from "@env";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
