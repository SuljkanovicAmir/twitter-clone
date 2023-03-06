import { doc, updateDoc, getDoc} from "firebase/firestore";
import { db} from "../../firebase/index";




async function unlike (doomedTweet, userID, userLikes) {

    const tweetRef = doc(db, 'tweets', doomedTweet);
    const userRef = doc(db, 'users', userID);

    const docSnap = await getDoc(tweetRef);
    const likes = docSnap.data().likes;
    const newLikes = likes.filter((aLike) => aLike !== userID);

    updateDoc(tweetRef, {likes: newLikes})

    const newList = userLikes.filter((likedTweet) => likedTweet !== doomedTweet);
    updateDoc(userRef, {likes: newList})

}

export default unlike;
