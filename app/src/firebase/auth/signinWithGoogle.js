import { firebaseApp } from "../../../firebase";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default async function loginWithGoogle() {
  try {
    //const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google login failed:", error);
  }
}
