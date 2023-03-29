import { initializeApp } from "firebase/app";
import { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_URL } from "@env";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_URL,
  projectId: "cruisemate-73926",
  storageBucket: "cruisemate-73926.appspot.com",
  messagingSenderId: "618638325870",
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
