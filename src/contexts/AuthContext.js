import React, { useEffect, useState, createContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';
import { db } from "../firebase/index";
import { auth } from '../firebase/index'
import { collection, query, where, onSnapshot, documentId, updateDoc } from "firebase/firestore";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true);
    const [userData, setUserData] = useState({});
    const usersRef = collection(db, 'users');


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
       
            if (currentUser) { 
                const q = query(usersRef, where(documentId(), "==", `${currentUser.uid}`));
                onSnapshot(q, (querySnapshot) => {
                    const items = []
                    querySnapshot.docs.forEach((doc) => {
                        let data = doc.data()
                        items.push(data);
                    },
                    (err) => console.log(err)
                );
                setUserData(items);
                });
           }
        });
        setPending(false)
        return () => {
            unsubscribe()
        }
        }, []);

        if(pending){
            return <>Loading...</>
          }

          
    return (
        <AuthContext.Provider value={{ createUser, currentUser, logout, signIn, userData, usersRef}}> 
            {children}
        </AuthContext.Provider>
    );
};