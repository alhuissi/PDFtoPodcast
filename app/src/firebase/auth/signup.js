import { firebaseApp } from "../../../firebase";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default async function signUp(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        const configPath = `users/`;
        const docRef = doc(collection(db, configPath), `${userCredential.user.uid}`);
        const user = {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          credits: 0,
        };
        await setDoc(docRef, user);
      }
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
