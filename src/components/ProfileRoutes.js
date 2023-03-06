import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useParams} from 'react-router-dom';
import LoadingScreen from './reusable/LoadingScreen';
import { query, where, onSnapshot } from "firebase/firestore";
import { Outlet } from 'react-router-dom';
import { collection } from "firebase/firestore";
import { db } from '../firebase/index'

function ProfileRoutes() {

const {userAt, userID} = useContext(AuthContext)

const { urlAt } = useParams();

const [userProfile, setUserProfile] = useState(null);
const [profileID, setProfileID] = useState(null);
const usersRef = collection(db, 'users');



const q = query(usersRef, where("at", "==", urlAt));

useEffect(() => {
    if (userAt === urlAt) {
        setProfileID(userID);
        setUserProfile(true);
    } else {
        setUserProfile(false);
        onSnapshot(q, (querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
                if (doc) {
                    setProfileID(doc.id);
                } else {
                    setProfileID(404);
                }
            });
        });
    }
}, [urlAt, userID, userAt]);

return (
    <div className="">
    {profileID ? (
        profileID !== 404 ? (
            <Outlet context={{profileID, userProfile}} />
        ) : (

            <p>Not found</p>
        )
    ) : (
        <LoadingScreen />
    )}
</div>
  )
}

export default ProfileRoutes