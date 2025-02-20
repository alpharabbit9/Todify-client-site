/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../Firebase/firebase.init";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";



export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const provider = new GoogleAuthProvider();

    const createGoogleUse = () => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    const userLogOut = () => {
        return signOut(auth);
      }


    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createGoogleUse,
        userLogOut
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })

        return () => {
            unSubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;