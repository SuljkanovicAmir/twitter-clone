import React, {useContext, useState} from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import Avatar from '../../assets/images/avatar.jpg'
import Close from '../../assets/images/close.svg'
import Reply from '../../assets/images/tweet-reactions/reply.svg'
import ImgIcon from '../../assets/images/tweet-form-icons/img-atch.svg'
import GifIcon from '../../assets/images/tweet-form-icons/gif-add.svg'
import PollIcon from '../../assets/images/tweet-form-icons/poll.svg'
import EmojiIcon from '../../assets/images/tweet-form-icons/emoji.svg'
import ScheduleIcon from '../../assets/images/tweet-form-icons/schedule.svg'
import LocationIcon from '../../assets/images/tweet-form-icons/location.svg'

function CreateTweet({setActive}) {

    const { userName, userAt, userID, userImage, userTweets } = useContext(AuthContext);
	const [text, setText] = useState("");
    const [createTweetActive, setCreateTweetActive] = useState(false)


    const handleSubmit = (e) => {
		e.preventDefault();
        if (text) {
			import("../functions/simpleTweet.js")
					.then((simpleTweet) =>
						simpleTweet.default({ userName, text, userAt, userID, userTweets })
					)
					.then(() => {
						setText("");
						setActive(false)
					})
					.catch((err) => console.log(err));
			}
        }

    const handleChange = (e) => {
        setText(e.target.value);
	};


  return (
    <div className='tf-wrapper'>
        <div>
            <div className="tf-close">
            <div>
                <img onClick={() => setActive(false)} src={Close} className="close-icon" alt='close-img'/>
            </div>    
            </div>
            <div>
                <div className='tf-content'>  
                    <div className="tweet-avatar form">
                        <div>
                            <img src={userImage} alt="tweet avatar" />
                        </div>
                    </div>
                    <div className='tf-main'>
                        <div  className={createTweetActive ? 'tf-textarea active' : 'tf-textarea'}>
                            <button>Everyone</button>
                            <textarea onClick={() => setCreateTweetActive(true)} required value={text} maxLength="300" name="tweet" id="" cols="30" rows="10" placeholder="What's happening?" onChange={handleChange}></textarea>
                        </div>
                        <div className={createTweetActive ? 'tf-can-reply active' : 'tf-can-reply'}>
                            <img src={Reply} alt="tweet avatar" />
                            <span>Everyone can reply</span>
                        </div>
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
                                    type="submit"
                                >
                                    Tweet
                                </button>
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