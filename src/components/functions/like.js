import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db} from "../../firebase/index";


async function like (tweet, userID, userLikes) {
  
    const tweetRef = doc(db, 'tweets', tweet);
    const userRef = doc(db, 'users', userID);

    const newList = [...userLikes, tweet];
  
    const docSnap = await getDoc(tweetRef);
    const data = docSnap.data();
    if (userID !== data.userID) {
       console.log("like", userID, data.userID, tweet)
    }
    const likes = docSnap.data().likes;
    
    const newLikes = [...(likes || []), userID];

    updateDoc(tweetRef, {likes: newLikes})
   
    updateDoc(userRef, {likes: newList})
   

   
};

export default like;
