import React, {useContext, useState, useEffect} from 'react'
import StatsIcon from '../assets/images/tweet-reactions/stats.svg'
import RetweetIcon from '../assets/images/tweet-reactions/retweet.svg'
import LikeIcon from '../assets/images/tweet-reactions/like.svg'
import CommentIcon from '../assets/images/tweet-reactions/comment.svg'
import Bookmark from '../assets/images/tweet-reactions/bookmark.svg'
import Dots from '../assets/images/dots.svg'
import LockIcon from '../assets/images/profile-info-icons/lock.svg'
import { AuthContext } from '../contexts/AuthContext';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/index'
import { Link } from "react-router-dom";
import reactStringReplace from 'react-string-replace';


function Tweet(props) {

  const [image, setImage] = useState("");
	const [timeSince, setTimeSince] = useState(null);


  const {
		name,
		at,
		time,
		text,
		retweets,
		likes,
		replyAt,
		replyTo,
		replies,
		tweetID,
		tweeterID,
		big,
    setFeedLoaded,
    feedLoaded
	} = props;
	const { userID, userImage, userAt, userLikes, userFollows, userTweets, userRetweets} = useContext(
		AuthContext
	);


  useEffect(() => {
    const storageAvatarRef = ref(storage, "avatars/" + tweeterID + '.png')
    getDownloadURL(storageAvatarRef).then((url) => {  
         setTimeout(() => {
          setFeedLoaded(true)    
         }, 1000)
         setImage(url);
        })
        .catch((e) => {
          console.log(e);
          setImage(Dots);
        });	
       
        if (time && !big) {
            import("./functions/elapser").then((elapser) =>
            setTimeSince(elapser.default(time))
          );
        } else if (time && big) {
          setTimeSince(new Date(time.seconds * 1000).toDateString())
        }
      }, [tweeterID, time, big]);


  return (
    <div className="tweet-wrapper">
      <article data-id="tweet" className="tweet-div">
        <Link to={`/${at}`} style={{ textDecoration: "none" }}>
          <div className="tweet-avatar">
            <div>
              <img src={image} alt="avatar" />
            </div>
          </div>
        </Link>
        <div className="tweet">
          <div className="tweet-names">
              <Link to={`/${at}`}>
                <div className="tweet-nick">{name}<img src={LockIcon} alt='lock icon' /></div>
              </Link>
              <Link to={`/${at}`}>
                <div className="tweet-username">{at}</div>
              </Link>
            <div className="tweet-username">{timeSince}</div>
            <div className="tweet-dots">
              <img src={Dots} alt="dots" />
            </div>
          </div>
          <div className="tweet-content">
            <div className="tweet-text">
              <span>
              {" "}
              {reactStringReplace(text, /(#\w+)/g, (match, i) => (
                  <Link
                    to={`/hashtag/${match.slice(1)}`}
                    key={i}
                    style={{ color: "rgb(29, 242, 161)" }}
                  >
                    {match}
                  </Link>
              ))}
            </span>
            </div>
            <div className="tweet-img">
            </div>
            <div className="tweet-reactions">
              <div> 
                <img src={CommentIcon} alt="comments" />
              </div>
              <div>
                <img src={RetweetIcon} alt="dots" />
              </div>
              <div>
                <img src={LikeIcon} alt="dots" />
              </div>
              <div>
                <img src={StatsIcon} alt="stats" />
              </div>
              <div>
                <img src={Bookmark} alt="dots" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Tweet