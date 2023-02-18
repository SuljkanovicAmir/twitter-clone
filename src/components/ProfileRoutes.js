import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useParams} from 'react-router-dom';
import LoadingScreen from './reusable/LoadingScreen';
import { query, where, onSnapshot } from "firebase/firestore";
import { Outlet } from 'react-router-dom';

function ProfileRoutes() {

const {userAt, userID, usersRef} = useContext(AuthContext)


const [userProfile, setUserProfile] = useState(null);
const [profileID, setProfileID] = useState(null);

const { urlAt } = useParams();



useEffect(() => {
    if (userAt === urlAt) {
        setProfileID(userID);
        setUserProfile(true);
    } else {
        setUserProfile(false);
        const q = query(usersRef, where("at", "==", urlAt));
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
}, [urlAt, userID, userAt, usersRef]);

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