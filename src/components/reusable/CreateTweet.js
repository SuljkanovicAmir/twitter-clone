import React, {useContext, useState} from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import Close from '../../assets/images/close.svg'
import Reply from '../../assets/images/tweet-reactions/reply.svg'
import ImgIcon from '../../assets/images/tweet-form-icons/img-atch.svg'
import GifIcon from '../../assets/images/tweet-form-icons/gif-add.svg'
import PollIcon from '../../assets/images/tweet-form-icons/poll.svg'
import EmojiIcon from '../../assets/images/tweet-form-icons/emoji.svg'
import ScheduleIcon from '../../assets/images/tweet-form-icons/schedule.svg'
import LocationIcon from '../../assets/images/tweet-form-icons/location.svg'
import { Link } from 'react-router-dom';

function CreateTweet(props) {

    const { modal, replyData, replyImage, toggle, isActive, setActive, setToast } = props;
    const { userName, userAt, userID, userImage, userTweets } = useContext(AuthContext);
	
    const [text, setText] = useState("");
    const [createTweetActive, setCreateTweetActive] = useState(false)
   

    const handleSubmit = (e) => {
		e.preventDefault();
        if (text) {
            if (replyData) {
                const { tweetID, tweeterID } = replyData;
                import("../functions/reply").then((reply) =>
                reply.default({
                    tweetID,
                    tweeterID,
                    userName,
                    userID,
                    userAt,
                    userTweets,
                    text,
                })
            ).then(() => {
                setText("");
                setTimeout(() => {
                    setToast("Your tweet was sent");
                }, 500);
                if(isActive) {
                    setActive(false)  
                }   
            })
            .catch((err) => console.log(err));
            
            } else {
                import("../functions/simpleTweet.js")
                        .then((simpleTweet) =>
                            simpleTweet.default({ userName, text, userAt, userID, userTweets })
                        )
                        .then(() => {
                            setText("");
                            setTimeout(() => {
                                setToast("Your tweet was sent");
                            }, 500);
                            if(isActive) {
                                setActive(false)  
                            }   
                        })
                        .catch((err) => console.log(err));
                
            }   
        }
        if (toggle) {
			toggle();
			}
        
    }


    const handleChange = (e) => {
        setText(e.target.value);
	};

    
  return (
    <div className={`${modal ? 'modal' : 'active'}`}>
         {modal &&  (
				<div className="reply-header">
					<img src={Close} alt="close" onClick={() => {toggle()}} />
				</div>
                
			)}
        <div className="reply-modal">   
			{replyData && (
				<div className="reply tf-content">
					<div className=" reply tweet-avatar form">
						<img src={replyImage} alt="user-profile" className="profile-image" />
                        <div className='line'></div>
					</div>
					<div className=" reply tweet">
						<div className=" reply tweet-names">
							<span className="tweet-nick">{replyData.name}</span>
							<span className="tweet-username">@{replyData.at}</span>
							<span className="tweet-time">{replyData.timeSince}</span>
						</div>
						<p className=" reply tweet-text">{replyData.text}</p>
						<p className="grey">
							Replying to{" "}
							<Link to={`/${replyData.at}`} className="link">
								@{replyData.at}
							</Link>
						</p>
					</div>
				</div>
			)}
        <div>
  
            <div>
                <div className='tf-content'>  
                    <div className="tweet-avatar form">
                        <div>
                            <img src={userImage} alt="tweet avatar" />
                        </div>
                    </div>
                    <div className='tf-main'>
                        <div  className={createTweetActive ? 'tf-textarea active' : 'tf-textarea'}>
                        {!replyData ? (
                            <button>Everyone</button>
                            ): (
                                ""
                        )
                        }
                            <textarea onClick={() => setCreateTweetActive(true)} required value={text} maxLength="300" name="tweet" id="" cols="30" rows="10" placeholder={replyData ? "Tweet your reply" : "What's happening?"} onChange={handleChange}></textarea>
                        </div>
                        {!replyData ? (
                        <div className={createTweetActive ? 'tf-can-reply active' : 'tf-can-reply'}>
                            <img src={Reply} alt="tweet avatar" />
                            <span>Everyone can reply</span>
                        </div>
                        ): (
                            ""
                        )
                        }
                        <div className='tf-footer'>
                            <div className='tf-footer-icons'>
                                <div> <img src={ImgIcon} alt="tweet avatar" /></div>
                                <div> <img src={GifIcon} alt="tweet avatar" /></div>
                                <div> <img src={PollIcon} alt="tweet avatar" /></div>
                                <div> <img src={EmojiIcon} alt="tweet avatar" /></div>
                                <div> <img src={ScheduleIcon} alt="tweet avatar" /></div>
                                <div> <img src={LocationIcon} alt="tweet avatar" /></div>
                            </div>
                            <div className='tf-footer-btn'>
                                <button
                                    onClick={handleSubmit}
                                    value={replyData ? "Reply" : "Tweet"}
                                >
                                    {replyData ? "Reply" : "Tweet"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>         
    </div>
    </div>
    
  )
}

export default CreateTweet