import { firebaseApp } from "../../../firebase";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
} from "firebase/firestore";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        const configPath = `users/`;
        const docRef = doc(
          collection(db, configPath),
          `${userCredential.user.uid}`
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const docData = docSnap.data();
          console.log("User data found: ", docData);
        } else {
          console.log("User data not found. Creating user data.");
          const newDocRef = doc(
            collection(db, configPath),
            `${userCredential.user.uid}`
          );
          const user = {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            credits: 0,
          };
          await setDoc(newDocRef, user);
        }
      }
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
