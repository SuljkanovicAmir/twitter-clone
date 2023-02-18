import React, { useState, useContext } from 'react'
import TwitterIcon from '../assets/images/twitter.jpg'
import HomeIcon from '../assets/images/home.svg'
import ExploreIcon from '../assets/images/explore.svg'
import NotifIcon from '../assets/images/notif.svg'
import MessagesIcon from '../assets/images/messages.svg'
import BookmarksIcon from '../assets/images/bookmarks.svg'
import ListsIcon from '../assets/images/lists.svg'
import ProfileIcon from '../assets/images/profile.svg'
import MoreIcon from '../assets/images/more.svg'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/index'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import CreateTweet from './reusable/CreateTweet'
import { useNavigate  } from 'react-router-dom'
import NavProfile from './reusable/NavProfile'



function Navigation() {

  const [isActive, setActive] = useState(false)
  const { userAt, currentUser } = useContext(AuthContext)
  let navigate = useNavigate();

  const signout = async () => {
    await signOut(auth)
    navigate("/LoginOrSignUp");
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
            <li>
              <NavLink to='/home'>
                <div className="notif-icons">
                  <div>
                    <img src={HomeIcon} alt="notif icon" />
                  </div>
                  <span>Home</span>
                </div>
              </NavLink>
            </li>
           
            <li>
              <div className="notif-icons">
                <div>
                  <img src={ExploreIcon} alt="notif icon" />
                </div>
                <span>Explore</span>
              </div>
            </li>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={NotifIcon} alt="notif icon" />
                </div>
                <span>Notifications</span>
              </div>
            </li>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={MessagesIcon} alt="notif icon" />
                </div>
                <span>Messages</span>
              </div>
            </li>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={BookmarksIcon} alt="notif icon" />
                </div>
                <span>Bookmarks</span>
              </div>
            </li>
            <li>
              <div className="notif-icons">
                <div>
                  <img src={ListsIcon} alt="notif icon" />
                </div>
                <span>Lists</span>
              </div>
            </li> 
            <li>
            <NavLink to={`/${userAt}`}>
              <div className="notif-icons">
                <div>
                  <img src={ProfileIcon} alt="notif icon" />
                </div>
                <span>Profile</span>
              </div>
              </NavLink>
            </li>
            
            <li>
              <div className="notif-icons">
                <div>
                  <img src={MoreIcon} alt="notif icon" />
                </div>
                <span>More</span>
              </div>
            </li>
            <li>
              <div className="notif-icons" onClick={() => signout()}>
                <div>
                  <img src={MoreIcon} alt="notif icon" />
                </div>
                <span>Sign Out</span>
              </div>
            </li>
          </nav>
          <div className="tweet-btn">
            <button onClick={() => setActive(true)}>Tweet</button>
          </div>
          <NavProfile />
        </div>
      </div>
    </div>
    <div className={isActive ? 'tweet-form-status' : 'tweet-form-status hidden'}>
       <div className='tweet-form-div'>
        <CreateTweet setActive={setActive} />
      </div>
      <div className='tf-backdrop'></div>
    </div>
   
    
    </>
  );
}

export default Navigation;

