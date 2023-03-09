import React, {useState, useEffect, useContext} from 'react'
import Tweet from '../Tweet'
import Dots from '../../assets/images/dots.svg'
import {  storage } from '../../firebase/index'
import { ref, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../../contexts/AuthContext';

function Feed(props) {
    

  const { tweetData, getReplies, noOriginal  } = props;
  const { userID, userImage } = useContext(AuthContext);

  const [feedLoaded, setFeedLoaded] = useState(false);
  const [uniqueTweets, setUniqueTweets] = useState([]);
  const [deleteToast, setDeleteToast] = useState(false);


    useEffect(() => {
        let finalImages = [];

        const makeComponents = () => {
			const sortedTweets = tweetData.sort(
				(a, b) => b.timeStamp.seconds - a.timeStamp.seconds
			);

        const filteredTweets = sortedTweets.filter((tweet) => {
				let status = true;
				if (tweet.replies && tweet.replies.length) {
					status = tweet.replies.some(
						(reply) => !sortedTweets.map((tweet) => tweet.id).includes(reply)
					);
				}
				return status;
			});

            const tweets = filteredTweets.map((tweet) => {
            const image = finalImages.filter((image) => image.id === tweet.userID);
                return ( 
                  <Tweet
                      key={tweet.id}
                      tweetID={tweet.id}
                      tweeterID={tweet.userID}
                      name={tweet.name}
                      at={tweet.at}
                      image={image[0]["image"]}
                      time={tweet.timeStamp}
                      text={tweet.text}
                      retweets={tweet.retweets}
                      replyTo={tweet.replyTo}
                      likes={tweet.likes}
                      getReplies={getReplies}
                      change={tweet.change}
                      imageCount={tweet.imageCount}
                      replies={tweet.replies}
                      setFeedLoaded={setFeedLoaded}
                      feedLoaded={feedLoaded}
                      deleteToast={setDeleteToast}
                      noOriginal={noOriginal}
                      />
                  )
                
              });
              setUniqueTweets(tweets);
              setTimeout(() => {
                setFeedLoaded(true)    
               }, 1000)
            }
            const check = (a, b) => {
                if (a.length === b.length) {
                    finalImages.push(...b);
                    makeComponents();
                }
            };
            
            if (userID && userImage && tweetData.length && !finalImages.length) {
                const tweeterIDs = tweetData.map((tweet) => {
                    return tweet.userID;
                });
                const uniqueTweeterIDs = [...new Set(tweeterIDs)];

                let tweeterImages = [];

                for (let tweeterID of uniqueTweeterIDs) {
                    if (tweeterID === userID) {
                        tweeterImages.push({ id: tweeterID, image: userImage });
                        setTimeout(() => {
                            setFeedLoaded(true)    
                           }, 1000)
                        check(uniqueTweeterIDs, tweeterImages);
                    } else {
                        const storageAvatarRef = ref(storage, "avatars/" + tweeterID + '.png')
                        getDownloadURL(storageAvatarRef).then((url) => {  
                            setTimeout(() => {
                                setFeedLoaded(true)    
                               }, 1000)
                               tweeterImages.push({ id: tweeterID, image: url });
                               check(uniqueTweeterIDs, tweeterImages);
                           })
                           .catch((e) => {
                              tweeterImages.push({ id: tweeterID, image: Dots });
                              check(uniqueTweeterIDs, tweeterImages);
                           });	
                    }
                }
            }

  }, [tweetData, userID, userImage, getReplies, noOriginal]);

  
    return ( 
    <div className='feed'>
        {uniqueTweets }
        <div className={feedLoaded ? 'feed-loading-screen' : 'feed-loading-screen active'}>
            <div className='feed-loader'></div>
        </div>
    </div>
   )
}

export default Feed