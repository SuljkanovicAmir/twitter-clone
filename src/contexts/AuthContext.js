/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, createContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';
import { db, storage, auth } from "../firebase/index";
import { collection, onSnapshot, doc } from "firebase/firestore";
import LoadingScreen from "../components/reusable/LoadingScreen";
import { getDownloadURL, ref } from 'firebase/storage';
import BirthdayIcon from '../assets/images/profile-info-icons/birthday.svg'

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [userID, setUserID] = useState(null);
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
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setCurrentUser(currentUser);
          setUserID(currentUser.uid);
          onSnapshot(doc(usersRef, currentUser.uid), (doc) => {
            let data = doc.data();
            setTimeout(() => {
              setPending(false);
            }, 200);
            setUserData((u) => ({
                ...u,
                joinDate: data.joinDate,
                bio: data.bio || "",
                retweets: data.retweets || [],
                likes: data.likes || [],
                tweets: data.tweets || [],
                followers: data.followers || [],
                follows: data.follows || [],
                at: data.at,
                name: data.name,
                website: data.website,
                dayOfBirth: data.dayOfBirth,
                monthOfBirth: data.monthOfBirth,
                yearOfBirth: data.yearOfBirth,
            }));
          }, (err) => console.log(err)
          );

          const storageAvatarRef = ref(storage,"avatars/" + currentUser.uid + ".png");

          getDownloadURL(storageAvatarRef)
            .then((url) => {
              setUserData((u) => ({ ...u, image: url }));
            })
            .catch(() => {
              console.log("set image again");
              setUserData((u) => ({ ...u, image: BirthdayIcon }));
            });

        } else {
          setTimeout(() => {
            setPending(false);
          }, 200);
        }
      });

    
    }, []);

    if (pending) {
      return <LoadingScreen />;
    }

        
    return (
        <AuthContext.Provider value={{	
                                    userID: userID,
                                    userAt: userData.at, 
                                    userImage: userData.image,
                                    userName: userData.name, 
                                    userFollows: userData.follows,
                                    userFollowers: userData.followers,
                                    userTweets: userData.tweets,
                                    userRetweets: userData.retweets,
                                    userLikes: userData.likes,
                                    userBio: userData.bio,
                                    userJoinDate: userData.joinDate,
                                    userBornDay: userData.dayOfBirth,
                                    userBornMonth: userData.monthOfBirth,
                                    userBornYear: userData.yearOfBirth,
                                    userWebsite: userData.website,
                                    createUser, 
                                    currentUser, 
                                    logout, 
                                    signIn,  
                                    usersRef, 
                                    pending, 
                                    setPending,
                                    }}> 
            {children}
        </AuthContext.Provider>
    );
};



