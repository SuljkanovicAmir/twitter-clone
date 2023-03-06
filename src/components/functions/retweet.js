import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"

async function retweet(tweetID, userID, userRetweets) {

    const tweetRef = doc(db, 'tweets', tweetID);
    const userRef = doc(db, 'users', userID);

    const newList = [...userRetweets, tweetID];

    const docSnap = await getDoc(tweetRef);
    const data = docSnap.data();
    if (userID !== data.userID) {
        /*("retweet", userID, data.userID, tweetID);*/
    }
    
    let retweets = docSnap.data().retweets;

    const newRetweets = [...(retweets || []), userID]
    
    updateDoc(tweetRef, {retweets: newRetweets})
    console.log("added to tweet's retweets");
    

    updateDoc(userRef, {retweets: newList})
}

export default retweet