import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "yggdrasil-ai-hermod.firebaseapp.com",
    projectId: "yggdrasil-ai-hermod",
    storageBucket: "yggdrasil-ai-hermod.appspot.com",
    messagingSenderId: "874257179571",
    appId: "1:874257179571:web:43f40926ed7aec2a4c21c6",
    measurementId: "G-LYNS3GNM56"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const getIdToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};

export { firebaseApp, auth, getIdToken };