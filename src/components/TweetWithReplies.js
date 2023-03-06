import React, { useState, useEffect, lazy, Suspense } from "react";
import Tweet from "./Tweet";
import { Link, useParams, useLocation } from "react-router-dom";
import { onSnapshot, doc, collection, query, where} from "firebase/firestore";
import Dots from '../assets/images/dots.svg'
import { db, storage } from '../firebase/index'
import { ref, getDownloadURL } from 'firebase/storage';
import BackIcon from '../assets/images/profile-info-icons/back.svg' 
import FeedLoadingScreen from "./reusable/FeedLoadingScreen";

const Feed = lazy(() => import("./reusable/Feed"));


function TweetWithReplies() {

    const { tweetID } = useParams();
    const [mainTweet, setMainTweet] = useState({});
    const [tweetData, setTweetData] = useState([]);
    const [image, setImage] = useState("");
    const [deleteToast, setDeleteToast] = useState(false);
    const [feedLoaded, setFeedLoaded] = useState(false);

    const location = useLocation();
    const tweetRef = collection(db, 'tweets');

  useEffect(() => {
  
        onSnapshot(doc(tweetRef, tweetID), (doc) => {
            let data = doc.data();
            setMainTweet({ ...data, id: doc.id });
            if(data) {
                const storageAvatarRef = ref(storage, "avatars/" + data.userID + '.png')
                const fetchData = async () => {
                await getDownloadURL(storageAvatarRef).then((url) => {  
                    setTimeout(() => {
                        setFeedLoaded(true)    
                       }, 2000)
                       setImage(url);
                   })
                   .catch((e) => {
                      console.log(e);
                      setImage(Dots);
                   });	
                  }
                  fetchData()  
            }
        });
      }, [tweetID]);



      useEffect(() => {
  
        const q = query(tweetRef, where("replyTo", "==", tweetID));
       

        onSnapshot(q, (querySnapshot) => {
            let tempArray = [];
           
            querySnapshot.forEach((doc) => {
                tempArray.push({ ...doc.data(), id: doc.id });
            })
            setTweetData(tempArray);
        })
      }, [tweetID]);
      
     
  return (
    <div className={feedLoaded ?  'tweet-loading-screen ' :'tweet-loaded active' }>
         <div className="back-from-profile">
            <div className="back-icon">
              <Link to={location.state ? location.state.prevPath : "/"}>
                <img src={BackIcon} alt="lock" />
              </Link>
            </div>
            <div>
              <div className="bfp-nickname top-link-text">
                Tweet
              </div>
            </div>
          </div>
          <Tweet
          key={mainTweet.id}
          tweetID={mainTweet.id}
          tweeterID={mainTweet.userID}
          name={mainTweet.name}
          at={mainTweet.at}
          time={mainTweet.timeStamp}
          text={mainTweet.text}
          retweets={mainTweet.retweets}
          replyTo={mainTweet.replyTo}
          likes={mainTweet.likes}
          getReplies={false}
          replies={mainTweet.replies}
          big={true}
          image={image}
          deleteToast={setDeleteToast}
          setFeedLoaded={setFeedLoaded}
          imageCount={mainTweet.imageCount}
        />
        {mainTweet.replies && mainTweet.replies.length ? (
				<Suspense fallback={<FeedLoadingScreen />}>
					<Feed tweetData={tweetData} noOriginal={true} />
				</Suspense>
			) : (
				""
			)}
    </div>
  )
}

export default TweetWithReplies
