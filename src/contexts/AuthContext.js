import React, { useEffect, useState, createContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';

import { auth } from '../firebase/index'


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true);

    const signIn = (email, password) =>  {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };

    const logout = () => {
        return signOut(auth)
    }
  

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setPending(false)
        });
        return () => {
            unsubscribe()
        }
        }, []);

        if(pending){
            return <>Loading...</>
          }

          
    return (
        <AuthContext.Provider value={{ createUser, currentUser, logout, signIn}}> 
            {children}
        </AuthContext.Provider>
    );
};