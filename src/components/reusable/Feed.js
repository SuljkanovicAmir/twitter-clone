import React, {useState} from 'react'
import Tweet from '../Tweet'

function Feed(props) {
    

  const { tweetData, getReplies } = props;

  const [feedLoaded, setFeedLoaded] = useState(false);



  const tweets = tweetData.map((tweet) => {

  return ( 
    <Tweet
        key={tweet.id}
        tweetID={tweet.id}
        tweeterID={tweet.userID}
        name={tweet.name}
        at={tweet.at}
        time={tweet.timeStamp}
        text={tweet.text}
        retweets={tweet.retweets}
        replyTo={tweet.replyTo}
        likes={tweet.likes}
        getReplies={getReplies}
        replies={tweet.replies}
        setFeedLoaded={setFeedLoaded}
        feedLoaded={feedLoaded}
        />
    )
});
    return ( 
    <div className='feed'>{tweets}
        <div className={feedLoaded ? 'feed-loading-screen' : 'feed-loading-screen active'}>
            <div className='feed-loader'></div>
        </div>
    </div>
   )
}

export default Feed