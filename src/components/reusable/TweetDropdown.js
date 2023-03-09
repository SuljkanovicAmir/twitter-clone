import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useNavigation } from "react-router-dom";
import FeedLoadingContainer from './FeedLoadingScreen'

const Warning = lazy(() => import("./Warning"));
const Cover = lazy(() => import("./Cover"));


function TweetDropdown(props) {

const { followed, tweetID, userID, tweeterID, userTweets, replyTo } = props;
const [userTweet, setUserTweet] = useState(false);
const [warning, setWarning] = useState(false);

const ref = useRef(null);

const deleteTweet = (e) => {
    e.stopPropagation();
    toggleWarning(false);
    if (userID) {
        import("../functions/deleteTweet.js").then((deleteTweet) => {
            deleteTweet.default(tweetID, userTweets, userID, replyTo);
            
        });
    }
};

const toggleWarning = () => {
    setWarning(!warning); 
    console.log('hi')
    console.log(warning)
};

useEffect(() => {
    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            props.toggle(e);
        }
        console.log(ref.current)
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
        document.removeEventListener("click", handleClickOutside);
    };
}, [props]);


useEffect(() => {
    userID === tweeterID && setUserTweet(true);
}, [userID, tweeterID]);


return userTweet ? (
    <div className='dropdown' onClick={(e) => {
        e.stopPropagation();
        setWarning(true);
    }}
    value={tweetID}
    ref={ref}
    >
        <div >
            <span className="delete-tweet">  Delete this tweet</span>
            {warning && (
				<Suspense fallback={<FeedLoadingContainer />}>
                    <Cover toggle={toggleWarning}>
						<Warning
							cancel={toggleWarning}
							title={`Delete Tweet?`}
							action={deleteTweet}
							actionName="Delete"
							message={`This can't be undone and it will be removed from your profile, 
									the timeline of any accounts that follow you, and from Twitter search results.`}
						/>
                    </Cover>
				</Suspense>
			)}
        </div>
    </div>
  ) : (
    ""
  )
}

export default TweetDropdown