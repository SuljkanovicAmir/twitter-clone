import React from 'react'
import Header from '../assets/images/header.jpg'
import BirthdayIcon from '../assets/images/profile-info-icons/birthday.svg'
import CalendarIcon from '../assets/images/profile-info-icons/calendar.svg'
import LockIcon from '../assets/images/profile-info-icons/lock.svg'
import BackIcon from '../assets/images/profile-info-icons/back.svg' 
import Tweet from './Tweet'


function ProfilePage() {
  return (
    <div>
        <div className='back-from-profile'>
            <div className='back-icon'>
                <img src={BackIcon}  alt='lock'/>
            </div>
            <div>
                <div className="bfp-nickname">
                    amir
                    <img src={LockIcon} alt='lock'/>
                </div>
                <div  className="bfp-tweetcount">26.9K Tweets</div>
            </div>
        </div>
        <div className='profile-div'>
            <div className='header'>
                <img src={Header} alt='profile header'></img>
            </div>
            <div className='profile-info'>
                <div className='pi-avatar-edit'>
                    <div className='pi-avatar'></div>
                    <div className='pi-edit-profile-btn'>
                        <button>Edit profile</button>
                    </div>
                </div>
                <div className='pi-acc-names'> 
                    <div className='pi-acc-nickname'>
                        <span>amir <img src={LockIcon} alt='locked acc' /></span>    
                    </div> 
                    <div className='pi-acc-username'>@_introvertedaf</div>
                </div>
                <div className='pi-bio'>76ers fan!</div>
                <div className='pi-personal-info'>
                    <span><img src={BirthdayIcon} alt='birthday icon'/> Born October 27, 1997</span> 
                    <span><img src={CalendarIcon} alt='calendar icon'/>Joined January 2013</span>
                </div>
                <div className='pi-following'>
                    <div>
                       <span className='following-number'>182</span>
                       <span className='following-text'>Following</span>
                    </div>
                    <div>
                       <span className='following-number'>648</span>
                       <span className='following-text'>Followers</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <nav className='profile-nav'>
                <li>
                    <div className='profile-nav-tweets'>
                        Tweets
                        <div>

                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        Tweets & replies
                    </div>
                </li>
                <li>
                    <div>
                        Media
                    </div>
                </li>
                <li>
                    <div>
                        Likes
                    </div>
                </li>
            </nav>
            <div className="profile-content">
                <Tweet />
            </div>
        </div>
    </div>
  )
}

export default ProfilePage