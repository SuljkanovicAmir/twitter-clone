import React from 'react'
import { doc, addDoc, collection, updateDoc } from "firebase/firestore"; 
import { db, storage, auth } from "../../firebase/index";

function simpleTweet(props) {

    const { userName, text, userAt, userID, userTweets } = props;

    const tweetRef = collection(db, 'tweets');
    const userRef = doc(db, 'users', userID);

    const hashRE = /(?<=#)\w+/;
	const hashFound = text.match(hashRE);

	const palRE = /(?<=@)\w+/;
	const palFound = text.match(palRE);

    addDoc(tweetRef, {
        name: userName,
        text: text,
        at: userAt,
        userID: userID,
        hashtags: hashFound,
		userTags: palFound,
        timeStamp: new Date(),
        retweets: [],
    }).then((newTweet) => {
            console.log(newTweet)
            updateDoc(userRef, {
                tweets: [...userTweets, newTweet.id] 
            });
        });
}

export default simpleTweet