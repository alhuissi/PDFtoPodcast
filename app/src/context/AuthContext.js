"use client";
import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import LoadingDots from "../../../components/LoadingDots";
import { firebaseApp } from "../../firebase";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
} from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const getUserData = async (userId) => {
    const configPath = `users/`;
    const docRef = doc(
      collection(db, configPath),
      `${userId}`
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      console.log("User data found: ", docData);
      return docData;
    }
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserData(user.uid);
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="pt-4 mx-auto text-center justify-center w-full h-full mt-96">
          <LoadingDots color="white" style="large" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
