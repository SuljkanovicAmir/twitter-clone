import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { query, onSnapshot, collection, where, orderBy } from "firebase/firestore";
import Feed from "./Feed";
import FeedLoadingScreen from './FeedLoadingScreen'
import { useOutletContext } from "react-router-dom";

function LikeFeed(props) {
    const { name, profileID } = useOutletContext();
	const [tweetData, setTweetData] = useState([]);
    const tweetRef = collection(db, 'tweets');

    useEffect(() => {
		document.title = `Tweets liked by ${name}`
	}, [name]);


    useEffect(() => {
        const q = query(tweetRef, where("likes", "array-contains", profileID), orderBy("timeStamp", "desc"));
    
        onSnapshot(q, (querySnapshot) => {
            let tempArray = [];
            querySnapshot.forEach((doc) => {
                tempArray.push({ ...doc.data(), id: doc.id });  
            })
            setTweetData(tempArray)
        })

    
    },[profileID]);

    return tweetData.length ? <Feed tweetData={tweetData} /> : <FeedLoadingScreen />;
}

export default LikeFeed