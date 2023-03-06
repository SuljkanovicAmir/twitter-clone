import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"

async function unRetweet(tweetID, userID, userRetweets) {
 
    
    const tweetRef = doc(db, 'tweets', tweetID);
    const userRef = doc(db, 'users', userID);
   

    const docSnap = await getDoc(tweetRef);
    const data = docSnap.data();

    const newRetweets = data.retweets.filter((tweet) => tweet !== userID);

    updateDoc(tweetRef, {retweets: newRetweets})
    console.log("removed from user's retweets")

    const newList = userRetweets.filter((tweet) => tweet !== tweetID);

    updateDoc(userRef, { retweets: newList })

}

export default unRetweet

/* 
  const notificationRef  = doc(db, 'users', userID);
    const notificationSnap = await getDoc(userRef);
    const notifData = notificationSnap.data();

    updateDoc(userRef,{
        notifications: data.notifications.filter(
            (notification) =>
                notification.type !== "like" || notification.object !== tweetID
        ),
    })

    */