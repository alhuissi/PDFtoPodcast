import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pdftopodcast.firebaseapp.com",
  projectId: "pdftopodcast",
  storageBucket: "pdftopodcast.appspot.com",
  messagingSenderId: "63788970767",
  appId: "1:63788970767:web:0366644dbb8ce7884c447a",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const getIdToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};

export { firebaseApp, auth, getIdToken };
