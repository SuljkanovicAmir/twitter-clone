import React, {useContext, useState, useEffect, Suspense, lazy} from 'react'
import StatsIcon from '../assets/images/tweet-reactions/stats.svg'
import RetweetIcon from '../assets/images/tweet-reactions/retweet.svg'
import RetweetedIcon from '../assets/images/tweet-reactions/retweet-filled.svg'
import LikeIcon from '../assets/images/tweet-reactions/like.svg'
import LikedIcon from '../assets/images/tweet-reactions/like-filled.svg'
import CommentIcon from '../assets/images/tweet-reactions/comment.svg'
import Bookmark from '../assets/images/tweet-reactions/bookmark.svg'
import Dots from '../assets/images/dots.svg'
import { AuthContext } from '../contexts/AuthContext';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/index'
import { Link, useLocation, useNavigate } from "react-router-dom";
import reactStringReplace from 'react-string-replace';
import { db } from "../firebase"
import { onSnapshot, doc, collection, getDoc} from "firebase/firestore";
import FeedLoadingScreen from './reusable/FeedLoadingScreen'
import UsersList from './reusable/UsersList'
import DeadTweet from './reusable/DeadTweet'
import CreateTweet from './reusable/CreateTweet'

const TweetDropdown = lazy(() => import("./reusable/TweetDropdown"));
const Cover = lazy(() => import("./reusable/Cover"));


function Tweet(props) {

	const [timeSince, setTimeSince] = useState(null);
  	const [retweetedBy, setRetweetedBy] = useState("");
	const [modal, setModal] = useState("");
	const [imageLoaded, setImageLoaded] = useState(false);
	const [reply, setReply] = useState(false);
	const [originalTweet, setOriginalTweet] = useState(null);
  	const [toast, setToast] = useState("");
	const [dropdown, setDropdown] = useState(false);
	const [pics, setPics] = useState([]);


  const location = useLocation();
  const history = useNavigate();

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
    feedLoaded,
    original,
    image,
    imageCount,
		deleteToast,
		noOriginal,
	} = props;

	const { userID, userAt, userLikes, userFollows, userTweets, userRetweets} = useContext(
		AuthContext
	);

const liked = likes && likes.includes(userID); 
const retweeted = retweets && retweets.includes(userID); 
const likeAmount = likes ? likes.length : "";
const isRetweet = userRetweets && userRetweets.includes(tweetID);
const retweetsAmount = retweets ? retweets.length : "";
const repliesAmount = replies ? replies.length : "";
const followed = userFollows && userFollows.includes(tweeterID); 

  useEffect(() => {
        if (time && !big) {
            import("./functions/elapser").then((elapser) =>
            setTimeSince(elapser.default(time))
          );
        } else if (time && big) {
          setTimeSince(new Date(time.seconds * 1000).toDateString())
        }
      }, [tweeterID, time, big]);

	
	   useEffect(() => {
        if (big) {
            setTimeout(() => {
				setFeedLoaded(true)    
			   }, 1000)
		
        }
      }, [ big])

      useEffect(() => {
        let mounted = true;
        if (mounted && replyTo && !noOriginal && !original) {
			const tweetRef = collection(db, 'tweets');
          	onSnapshot(doc(tweetRef, replyTo), (doc) => {
            let data = doc.data();
            if (doc.exists && mounted) {
            	const storageAvatarRef = ref(storage, "avatars/" + data.userID + '.png')
				getDownloadURL(storageAvatarRef).then((url) => {  
					setOriginalTweet(
											<Tweet
												key={doc.id}
												tweetID={doc.id}
												tweeterID={data.userID}
												name={data.name}
												at={data.at}
												time={data.timeStamp}
												text={data.text}
												retweets={data.retweets}
												replyTo={data.replyTo}
												likes={data.likes}
												getReplies={false}
												replies={data.replies}
												imageCount={data.imageCount}
												deleteToast={deleteToast}
												original={true}
												image={url}
												replyImageLoad={setImageLoaded}
											/>
										);
					})
					.catch((e) => {
						<Tweet
							key={doc.id}
							tweetID={doc.id}
							tweeterID={data.userID}
							name={data.name}
							at={data.at}
							time={data.timeStamp}
							text={data.text}
							retweets={data.retweets}
							replyTo={data.replyTo}
							likes={data.likes}
							getReplies={false}
							replies={data.replies}
							imageCount={data.imageCount}
							image={Dots}
							deleteToast={deleteToast}
							original={true}
							replyImageLoad={setImageLoaded}
							/>
					});
              	}
				 
        })
	}
				
    
        return () => (mounted = false);
         
      },  [big, replyTo, deleteToast, original, noOriginal, location.pathname, tweetID]);


	  useEffect(() => {
		let mounted = true;
		if (mounted && imageCount) {
			let tempArray = [];
			for (let i = 0; i < imageCount; i++) {
				const storageTweetImgRef = ref(storage, "tweet_pictures/" + tweetID + "/" + i + '.png')
				getDownloadURL(storageTweetImgRef)
					// eslint-disable-next-line no-loop-func
					.then((url) => {
						const jsx = (
							<a
								href={url}
								target="_blank"
								rel="noreferrer"
								className="image-container"
								onClick={(e) => {
									e.stopPropagation();
								}}
								key={url}
							>
								<img
									src={url}
									alt="user-submitted-pic"
									className="preview-image"
								/>
							</a>
						);
						tempArray.push(jsx);
						if (mounted && i === imageCount - 1) {
							setPics(tempArray);
						}
					})
					.catch((err) => {
						console.log(err);
						if (err.code === "storage/object-not-found") {
							setTimeout(() => {
								const storageTweetImgRef = ref(storage, "tweet_pictures/" + tweetID + "/" + i + '.png')
								getDownloadURL(storageTweetImgRef)
								.then((url) => {
										const jsx = (
											<a
												href={url}
												target="_blank"
												rel="noreferrer"
												className="image-container"
												onClick={(e) => {
													e.stopPropagation();
												}}
												key={url}
											>
												<img
													src={url}
													alt="user-submitted-pic"
													className="preview-image"
												/>
											</a>
										);
										tempArray.push(jsx);
										if (i === imageCount - 1) {
											setPics(tempArray);
	
										}
									})
									.catch((err) => console.log("well eck lmao"));
							}, 4000);
						}
					});
			}
		}
		return () => (mounted = false);
	}, [imageCount, tweetID]);




useEffect(() => {
    let mounted = true;
		if (mounted) {
			if (retweets && retweets.includes(userID)) {
				setRetweetedBy(userAt);
			} else if (retweets && retweets.length > 0) {
          const fetchData = async () => {
            let id = retweets[retweets.length - 1]
            const userRef = doc(db, 'users', id);
            const docSnap = await getDoc(userRef);
            const data = docSnap.data();
            setRetweetedBy(data.at)
          }
          fetchData()  
			} else {
				setRetweetedBy("");
			}
    }
    return () => (mounted = false);
	}, [retweets, userID, userAt]);




  const toggleReply = (e) => {
		if (e) {
			e.stopPropagation();
		}
		if (userID) {
			setReply(!reply);
		}
	};



  const like = (e) => {
		e.stopPropagation();
		if (userID) {
			import("./functions/like").then((like) =>
				like.default(tweetID, userID, userLikes)
			);
		}
	};

  const unlike = (e) => {
		e.stopPropagation();
		if (userID) {
			import("./functions/unlike").then((unlike) =>
				unlike.default(tweetID, userID, userLikes)
			);
		}
	};

  const retweet = (e) => {
		e.stopPropagation();
		if (userID) {
			!userRetweets.includes(tweetID) &&
				import("./functions/retweet").then((retweet) =>
					retweet.default(tweetID, userID, userRetweets)
				);
		}
	};

  
	const unRetweet = (e) => {
		e.stopPropagation();
		if (userID) {
			import("./functions/unRetweet").then((unRetweet) =>
				unRetweet.default(tweetID, userID, userRetweets)
			);
		}
	};

  const follow = (e) => {
		e.stopPropagation();
		if (userID) {
			import("./functions/follow").then((follow) =>
				follow.default(tweeterID, userID, userFollows)
			);
		}
	};

  const unfollow = (e) => {
		e.stopPropagation();
		if (userID) {
			import("./functions/unfollow").then((unfollow) =>
				unfollow.default(tweeterID, userID, userFollows)
			);
		}
	};


 // eslint-disable-next-line no-useless-escape
 const urlRe = /^https?:\/\/(?:www\.)*/g;
 const urlText = reactStringReplace(text, urlRe, (match, i) => (
   <a
     href={`//${match}`}
     target='_blank'
     rel="noreferrer"
     key={i + match}
     style={{ color: "#ff7a00d6" }}
   >
     {match}
   </a>
   
 ));




	const hashedText = reactStringReplace(urlText, /(#\w+)/g, (match, i) => (
		<Link
			to={`/hashtag/${match.slice(1)}`}
			key={i + match}
      style={{ color: "#ff7a00d6" }}
		>
			{match}
		</Link>
	));


 

	const linkedText = reactStringReplace(hashedText, /(@\w+)/g, (match, i) => (
		<Link
			to={`/${match.slice(1)}`}
			key={i + match}
      style={{ color: "#317ace " }}
		>
			{match}
		</Link>
	));

  

  const redirect = (e) => {
		history({ pathname: `/tweet/${tweetID}`, state: { prevPath: location.pathname } });
	};

  const imageLoad = () => {
		// if this is a tweet with replies, only show both tweets once the images are loaded.
		if (original) {
			setImageLoaded(true);
			props.replyImageLoad(true);

			// if we aren't waiting for an original tweet, we can show this as soon as the image is ready.
		} else if (!replyTo || noOriginal) {
			setImageLoaded(true);
		}
	};


  const toggleDropdown = (e) => {
		e.stopPropagation();
		if (userID) {
			setDropdown(!dropdown);
		}
	};
 

  return (
    <>
    
			{replyTo && originalTweet}
			<div
				className={`tweet ${imageLoaded ? "" : "hide"} ${big ? "big" : "pad"} ${
					original ? "original" : ""
				}`}
				
			>
    <div className="tweet-wrapper">
       {retweetedBy && (
					<Link to={`/${retweetedBy}`} className="hover-under">
						<div className={`retweeted ${big ? "big-retweeted" : ""}`}>
              <img src={RetweetIcon} alt="retweet" />
							<p>
								{userAt === retweetedBy
									? "You Retweeted"
									: `${retweetedBy} Retweeted`}
							</p>
						</div>
					</Link>
				)}
      <article data-id="tweet" className="tweet-div">
        <Link to={`/${at}`} style={{ textDecoration: "none" }}>
          <div className="tweet-avatar">
            <div>
              <img onLoad={imageLoad} src={image} alt="avatar" />
            </div>
          </div>
        </Link>  
        <div className="tweet">
          <div className="tweet-names">
              <Link to={`/${at}`}>
                <div className="tweet-nick">{name}</div>
              </Link>
              <Link to={`/${at}`}>
                <div className="tweet-username">{at}</div>
              </Link>
              {!big ?
              <Link to={{
										pathname: `/tweet/${tweetID}`,
										state: { prevPath: location.pathname },
									}}>
                <div className="tweet-username">{timeSince}</div>
              </Link>
              : "" 
            }
            <div className="tweet-dots">
              <img src={Dots} alt="dots"  onClick={(e) => toggleDropdown(e)} />
              {dropdown && (
									<Suspense fallback={<FeedLoadingScreen absolute={true} />}>
										<TweetDropdown
											unfollow={unfollow}
											follow={follow}
											followed={followed}
											replyTo={replyTo}
											tweetID={tweetID}
											userID={userID}
											userTweets={userTweets}
											deleteToast={deleteToast}
											tweeterID={tweeterID}
											toggle={toggleDropdown}
										/>
									</Suspense>
								)}
            </div>
          </div>
          <div className="tweet-content">
            <div className={big ? "big tweet-text" : "tweet-text"}>
              <span>
              {" "}
              {linkedText}
            </span>
            </div>
            <div className="tweet-img">
			{imageCount ? (
							imageCount > 1 ? (
								<div className={`preview-images ${big ? "pad" : ""}`}>
									<div className="preview-images-half">
										{pics.slice(0, Math.round(pics.length / 2))}
									</div>
									<div className="preview-images-half">
										{pics.slice(Math.round(pics.length / 2))}
									</div>
								</div>
							) : (
								<div className={`preview-images ${big ? "pad" : ""}`}>{pics}</div>
							)
						) : (
							""
						)}
            </div>
            {big ? (
               <div className="big-tweet-time">{timeSince}</div>
            ): (
              "" 
            )}
            {big && (retweetsAmount > 0 || likeAmount > 0) && (
              <div className='big-tweet-info'>
                {retweetsAmount > 0 && ( 
                  <p onClick={() => setModal("retweets")}>
                    <span>{retweetsAmount}</span>
                    <span className='rt-like'>Retweet{retweetsAmount > 1 && "s"}</span>
                  </p>
                )}
                {likeAmount > 0 && (
									<p onClick={() => setModal("likes")}>
										<span className="bold">{likeAmount}</span>{" "}
										<span className='rt-like'>Like{likeAmount > 1 && "s"}</span>
									</p>
								)}
              </div>
            )}
         
            <div className="tweet-reactions">
              <div className="reply-div" onClick={toggleReply}> 
                <img src={CommentIcon} alt="comments" />
                <span> {!big && (repliesAmount || "")}</span>
              </div>
              <div
                onClick={isRetweet ? unRetweet : retweet}
              >
                {retweeted  ? (
                <img src={RetweetedIcon} alt="retweeted" />
                ) : (
                  <img src={RetweetIcon} alt="retweet" />
                )}
                <span>{(retweetsAmount  || "")}</span>
              </div>
              <div
               value={tweetID}
               onClick={liked ? unlike : like}
               >
              {liked ? (
                <img src={LikedIcon} alt="liked"/>
                ) : (
                  <img src={LikeIcon} alt="like" />
                )}
                <span>{(likeAmount || "")}</span>
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
    {originalTweet && big ? (
							<p className="grey replying-to ">
								Replying to{" "}
								<Link
									to={`/${originalTweet.props.at}`}
									className="hover-under begotten-link"
								>
									@{originalTweet.props.at}
								</Link>
							</p>
						) : (
							""
						)}
   
    {reply && (
						<Suspense fallback={<FeedLoadingScreen />}>
							<Cover toggle={toggleReply}>
								<CreateTweet
									modal={true}
									replyData={props}
									replyImage={image}
									replyTimeSince={timeSince}
									toggle={toggleReply}
                  					setToast={setToast}
								/>
							</Cover>
						</Suspense>
						
					)}
    {modal ? (
					<Suspense fallback={<FeedLoadingScreen />}>
							<UsersList
								type={modal}
								tweetID={tweetID}
								noBio={true}
								clear={() => setModal("")}
							/>{" "}
					</Suspense>
				) : (
					""
				)}
         </div>
  </>
)
}

export default Tweet