import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import { AuthContext } from './AuthContext';



const AuthProvider = ({ children }) => {


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

     const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    }


    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false);
            //console.log('auth state change', currentUser);
        });

        return()=>{
            unSubscribe();
        }

    },[])


    const authInfo ={
         
        createUser,
        updateUserProfile,
        signIn,
        user,
        loading,
        signInWithGoogle,
        logOut


    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;

