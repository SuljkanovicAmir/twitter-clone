import {
  doc,
  deleteDoc,
  collection,
  updateDoc,
  where,
  query,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db} from "../../firebase/index";

async function deleteTweet(doomedTweet, userTweets, userID, replyTo) {
  const userRef = doc(db, "users", userID);

  const newList = userTweets.filter((tweet) => tweet !== doomedTweet);
  await updateDoc(userRef, { tweets: newList });

  await deleteDoc(doc(db, "tweets", doomedTweet));

  const userRetRef = collection(db, "users");

  const q = query(userRetRef, where("retweets", "array-contains", doomedTweet));
  await onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((user) => {
      const data = user.data();
      const newRetweets = data.retweets.filter(
        (retweet) => retweet !== doomedTweet
      );

      const userIDRef = doc(db, "users", user.id);
      updateDoc(userIDRef, { retweets: newRetweets });
    });
  });

  const q2 = query(userRetRef, where("likes", "array-contains", doomedTweet));
  await onSnapshot(q2, (querySnapshot) => {
    querySnapshot.forEach((user) => {
      const data = user.data();
      const newLikes = data.likes.filter((like) => like !== doomedTweet) || [];
      const userIDRef = doc(db, "users", user.id);
      updateDoc(userIDRef, { likes: newLikes });
    });
  });

  if (replyTo) {
    const replyRef = doc(db, "tweets", replyTo);

    const docSnap = await getDoc(replyRef);
    const data = docSnap.data();
    console.log(data);

    await updateDoc(replyRef, {
      replies: data.replies.filter((reply) => reply !== doomedTweet),
    });

    const userIDRef = doc(db, "users", docSnap.id);

    const docSnap2 = await getDoc(userIDRef);
    const data2 = docSnap2.data();
    console.log(data2);

    /*
            await updateDoc(userIDRef, {
                notifications: data2.notifications.filter(
                    (notification) =>
                        notification.object !== doomedTweet || notification.type !== "reply"
                ),
            });
            */
  }
}

export default deleteTweet;
