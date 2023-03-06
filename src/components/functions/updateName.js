
import { collection, onSnapshot, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";


async function updateName(userID, name) {
    
    const tweetRef = collection(db, 'tweets');
    const q = query(tweetRef, where("userID", "==", userID));
     onSnapshot(q, (snapshot) => {
        snapshot.forEach((docs) => {
          const tweetsRef = doc(db, 'tweets', docs.id);
          updateDoc(tweetsRef, { name: name})
        })
       
      });
}

export default updateName