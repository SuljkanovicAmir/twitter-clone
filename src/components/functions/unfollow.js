import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';

async function unfollow(doomedAccount, userID, userFollows) {
    
    const usersRef = doc(db, 'users', doomedAccount);
    const userRef = doc(db, 'users', userID);
    
    
    const docSnap = await getDoc(usersRef);

    const data = docSnap.data();
	const followers = data.followers;
    let newList = followers.filter((follower) => follower !== userID);
    updateDoc(usersRef, {followers: newList})

    newList = userFollows.filter((account) => account !== doomedAccount);
    updateDoc(userRef, {follows: newList})

}

export default unfollow