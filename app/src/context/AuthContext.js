"use client";
import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import LoadingDots from "../../../components/LoadingDots";
import { firebaseApp } from "../../firebase";

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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
