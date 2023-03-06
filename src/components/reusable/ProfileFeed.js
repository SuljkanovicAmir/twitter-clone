import React, {useEffect, useState} from 'react'
import { db} from "../../firebase/index";
import Feed from './Feed';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useOutletContext } from 'react-router-dom';


function ProfileFeed(props) {

    const {profileID } = useOutletContext();

    const [tweetData, setTweetData] = useState([]);
    const tweetRef = collection(db, 'tweets');


useEffect(() =>{
    setTweetData([])

    const q = query(tweetRef,  where("userID", "==", profileID), orderBy("timeStamp", "desc"));
    const retweetQ = query(tweetRef,  where("retweets", "array-contains", profileID));

       


    const unsub = onSnapshot(q, (querySnapshot) => {
        let tempArray = [];
        let deletionArray = [];

        querySnapshot.docChanges().forEach((change) => {
       
            const doc = change.doc;
            if (change.type === "removed") {
                deletionArray.push(doc.id);
            }
        })

        querySnapshot.forEach((doc) => {
            if (!doc.data().replyTo) {
                tempArray.push({ ...doc.data(), id: doc.id });
            }
        })
       
        setTweetData(tempArray.filter((doc) => !deletionArray.includes(doc.id)));
    })

    const retweetUnsub = onSnapshot(retweetQ, (querySnapshot) => {
        let tempArray = [];
        let deletionArray = [];

      
     
        querySnapshot.docChanges().forEach((change) => {
            const doc = change.doc;
            if (change.type === "removed") {
                deletionArray.push(doc.id);
            }
        })

        querySnapshot.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        })

        setTweetData((t) => {
            const IDs = tempArray.map((doc) => doc.id);
            const newT = t.filter((doc) => {
                return !IDs.includes(doc.id);
            });
            const data = [...tempArray, ...newT].filter(
                (doc) => !deletionArray.includes(doc.id)
            );
            return data.sort((a,b) => (a.timeStamp > b.timeStamp) ? -1 : ((b.timeStamp > a.timeStamp) ? 1 : 0))

        });
    })

   

    return () => {
        unsub();
        retweetUnsub()
    };
   
}, [profileID])

    return (
        <>
            {tweetData.length ? <Feed tweetData={tweetData}/> : <></>}
        </>
    )
}

export default ProfileFeed

