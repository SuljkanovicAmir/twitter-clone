import React from 'react'
import Avatar from '../assets/images/avatar.jpg'
import Close from '../assets/images/close.svg'
import Reply from '../assets/images/tweet-reactions/reply.svg'
import ImgIcon from '../assets/images/tweet-form-icons/img-atch.svg'
import GifIcon from '../assets/images/tweet-form-icons/gif-add.svg'
import PollIcon from '../assets/images/tweet-form-icons/poll.svg'
import EmojiIcon from '../assets/images/tweet-form-icons/emoji.svg'
import ScheduleIcon from '../assets/images/tweet-form-icons/schedule.svg'
import LocationIcon from '../assets/images/tweet-form-icons/location.svg'



function TweetForm( { setActive }) {
  return (
    <div>
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
                            <img src={Avatar} alt="tweet avatar" />
                        </div>
                    </div>
                    <div className='tf-main'>
                        <div className='tf-textarea'>
                            <button>Everyone</button>
                            <textarea  maxLength="300" name="tweet" id="" cols="30" rows="10" placeholder="What's happening?"></textarea>
                        </div>
                        <div className='tf-can-reply'>
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
                                <button>
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

export default TweetForm