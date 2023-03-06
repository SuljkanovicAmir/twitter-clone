import { doc, addDoc, collection, updateDoc, getDoc, onSnapshot } from "firebase/firestore"; 
import { db, storage, auth } from "../../firebase/index";



async function reply(props) {

    const { tweetID, tweeterID, userName, text, userAt, userID, userTweets } = props;


    const tweetRef = collection(db, 'tweets');
    const userRef = doc(db, 'users', userID);

    const hashRE = /(?:#)\w+/;
	const hashFound = text.match(hashRE);
   

	const palRE = /(?:@)\w+/;
	const palFound = text.match(palRE);
    

    // eslint-disable-next-line no-useless-escape
    const urlRe = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
	const urlFound = text.match(urlRe);
    

 
    addDoc(tweetRef, {
        name: userName,
        text: text,
        at: userAt,
        userID: userID,
        hashtags: hashFound || [],
        userTags: palFound || [],
        urls: urlFound || [],
        timeStamp: new Date(),
        replyTo: tweetID,
		replyUserID: tweeterID,
		retweets: [],
		likes: [],
		replies: [],
    }).then((newTweet) => {
        

            updateDoc(userRef, {tweets: [...userTweets, newTweet.id] });
           
            const tweetWithIdRef = doc(db, 'tweets', tweetID);
            
         
                
            async function fetchData () {
                const docSnap = await getDoc(tweetWithIdRef)
                const originalData = docSnap.data();
                const originalReplies = originalData.replies;
                const newReplies = [...(originalReplies || []), newTweet.id];
    
               
    
                updateDoc(tweetWithIdRef, {replies: newReplies})
    
                if (userID !== originalData.userID) {
                    console.log("reply", userID, originalData.userID, newTweet.id);
                }
                console.log(docSnap)
            }
          fetchData()
           

    });

  
    
}

export default reply

/*
      
        
        */