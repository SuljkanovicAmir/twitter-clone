import { doc, runTransaction} from "firebase/firestore";
import { db } from '../../firebase';


async function follow(followID, userID, userFollows) {
    const usersRef = doc(db, 'users', followID);
    const userRef = doc(db, 'users', userID);


    try {
        await runTransaction(db, async (transaction) => {
            await transaction.get(usersRef).then((snapshot) => {
                let followers = snapshot.data().followers;
                let newFollowers = [...(followers || []), userID]
                transaction.update(usersRef, { followers: newFollowers })
                
                const newList = [...userFollows, followID];
                transaction.update(userRef, { follows: newList})
                console.log("successful transaction")
            })
        })
    } catch(err) {
        console.log(err);
        console.log("Transaction failed: ", err);
    };

   
        
    
}

export default follow