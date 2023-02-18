import React, {useEffect, useState, useContext} from 'react'
import { db} from "../../firebase/index";
import Feed from './Feed';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";



function ProfileFeed(props) {
	const { profileID } = props;

    const [tweetData, setTweetData] = useState([]);
    const tweetRef = collection(db, 'tweets');


useEffect(() =>{
    setTweetData([])
    const q = query(tweetRef,  where("userID", "==", profileID), orderBy("timeStamp", "desc"));
   
    const unsub = onSnapshot(q, (querySnapshot) => {
        let tempArray = [];
        querySnapshot.forEach((doc) => {
            if (!doc.data().replyTo) {
                tempArray.push({ ...doc.data(), id: doc.id });
            }

        })
        setTweetData(tempArray);
    })

    return () => {
        unsub();
    };
   
}, [profileID])

    return (
        <>
            {tweetData.length ? <Feed tweetData={tweetData}/> : <></>}
        </>
    )
}

export default ProfileFeed

