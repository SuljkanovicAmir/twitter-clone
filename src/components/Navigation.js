import React, { useState } from 'react'
import TwitterIcon from '../assets/images/twitter.jpg'
import HomeIcon from '../assets/images/home.svg'
import ExploreIcon from '../assets/images/explore.svg'
import NotifIcon from '../assets/images/notif.svg'
import MessagesIcon from '../assets/images/messages.svg'
import BookmarksIcon from '../assets/images/bookmarks.svg'
import ListsIcon from '../assets/images/lists.svg'
import ProfileIcon from '../assets/images/profile.svg'
import MoreIcon from '../assets/images/more.svg'
import Dots from '../assets/images/dots.svg'
import Avatar from '../assets/images/avatar.jpg'
import LockIcon from '../assets/images/profile-info-icons/lock.svg'
import TweetForm from './TweetForm'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/index'
import { NavLink } from 'react-router-dom'

function Navigation() {

  const [isActive, setActive] = useState(false)

  const signout = async () => {
    await signOut(auth)
  }

  return (
    <>
    <div className="navigation-container">
      <div className="navigation-wrapper">
        <div className="navigation-div">
          <div className="twitter-icon-nav">
            <img src={TwitterIcon} alt="twitter icon" />
          </div>
          <nav>
            <NavLink to='/home'>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={HomeIcon} alt="notif icon" />
                </div>
                Home
              </div>
            </li>
            </NavLink>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={ExploreIcon} alt="notif icon" />
                </div>
                Explore
              </div>
            </li>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={NotifIcon} alt="notif icon" />
                </div>
                Notifications
              </div>
            </li>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={MessagesIcon} alt="notif icon" />
                </div>
                Messages
              </div>
            </li>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={BookmarksIcon} alt="notif icon" />
                </div>
                Bookmarks
              </div>
            </li>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={ListsIcon} alt="notif icon" />
                </div>
                Lists
              </div>
            </li>
            <NavLink to='/profile'>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={ProfileIcon} alt="notif icon" />
                </div>
                Profile
              </div>
            </li>
            </NavLink>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={MoreIcon} alt="notif icon" />
                </div>
                More
              </div>
            </li>
            <li>
              <div className="notif-icons" onClick={signout}>
                <div>
                  <img src={MoreIcon} alt="notif icon" />
                </div>
                Sign Out
              </div>
            </li>
          </nav>
          <div className="tweet-btn">
            <button onClick={() => setActive(true)}>Tweet</button>
          </div>
          <div className="nav-acc-name">
            <div className='avatar'>
                <img src={Avatar} alt='icon'/>
            </div>
            <div>
                <div className='nav-acc-nickname'>
                    amir 
                    <img src={LockIcon} alt='locked acc' />
                </div>
                <div className='nav-username'>
                    @_introvertedaf
                </div>
            </div>
            <div className='nav-acc-dots'>
                <img src={Dots} alt='dots' />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={isActive ? 'tweet-form-status' : 'tweet-form-status hidden'}>
       <div className='tweet-form-div'>
        <TweetForm setActive={setActive} />
      </div>
        <div className='backdrop window'></div>
    </div>
   
    
    </>
  );
}

export default Navigation;

