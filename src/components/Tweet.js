import React from 'react'
import StatsIcon from '../assets/images/tweet-reactions/stats.svg'
import RetweetIcon from '../assets/images/tweet-reactions/retweet.svg'
import LikeIcon from '../assets/images/tweet-reactions/like.svg'
import CommentIcon from '../assets/images/tweet-reactions/comment.svg'
import Bookmark from '../assets/images/tweet-reactions/bookmark.svg'
import Avatar from '../assets/images/avatar.jpg'
import TweetImg from '../assets/images/tweet-img.jpg'
import Dots from '../assets/images/dots.svg'
import LockIcon from '../assets/images/profile-info-icons/lock.svg'


function Tweet() {
  return (
    <div className="tweet-wrapper">
      <article data-id="tweet" className="tweet-div">
        <div className="tweet-avatar">
          <div>
            <img src={Avatar} alt="tweet avatar" />
          </div>
        </div>
        <div className="tweet">
          <div className="tweet-names">
            <div className="tweet-nick">amir <img src={LockIcon} alt='lock icon' /></div>
            <div className="tweet-username">@_introvertedaf</div>
            <div className="tweet-dots">
              <img src={Dots} alt="dots" />
            </div>
          </div>
          <div className="tweet-content">
            <div className="tweet-text">
              Do you remember when you joined Twitter? I do!
              #MyTwitterAnniversary damnnnn
            </div>
            <div className="tweet-img">
              <div style={{ backgroundImage: `url(${TweetImg})` }}></div>
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
      <article data-id="tweet" className="tweet-div">
        <div className="tweet-avatar">
          <div>
            <img src={Avatar} alt="tweet avatar" />
          </div>
        </div>
        <div className="tweet">
          <div className="tweet-names">
            <div className="tweet-nick">amir <img src={LockIcon} alt='lock icon' /></div>
            <div className="tweet-username">@_introvertedaf</div>
            <div className="tweet-dots">
              <img src={Dots} alt="dots" />
            </div>
          </div>
          <div className="tweet-content">
            <div className="tweet-text">
              Bruh moment
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