import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { doc, onSnapshot } from "firebase/firestore";
import { useOutletContext, NavLink, useParams} from "react-router-dom";
import BackIcon from '../assets/images/profile-info-icons/back.svg' 
import AccountList from './reusable/AccountList'

function ProfileFollows(props) {


  const { userName, userAt, usersRef } = useContext(AuthContext);
  const [stuff, setStuff] = useState({});
  const { urlAt } = useParams();
 
  const { userProfile, profileID } = useOutletContext();



  useEffect(() => {
		userProfile
			? setStuff({ name: userName, at: userAt })
			
      : onSnapshot(doc(usersRef, profileID), (doc) => {
        const data = doc.data();
        setStuff({ name: data.name, at: data.at });
      }); 

  }, [profileID, userAt, userName, userProfile])

  
  return (
    <>
    <div>
         <div className="back-from-profile">
            <div className="back-icon">
              <NavLink to={`/${urlAt}`}>
                <img src={BackIcon} alt="lock" />
              </NavLink>
            </div>
            <div>
              <div className="bfp-nickname">
                {stuff.name}
              </div>
              <div className="bfp-tweetcount">
                @{stuff.at}
              </div>
            </div>
          </div>
        <nav className="profile-follow-nav">
          <NavLink to={`/${urlAt}/followers`}>
            <li>
              <div>Followers</div>
            </li>
            </NavLink>
            <NavLink to={`/${urlAt}/following`}>
            <li>
              <div>Following</div>
            </li>
            </NavLink>
          </nav>
    </div>
    <AccountList profileID={profileID} name={stuff.name} />
    </>
  )
}

export default ProfileFollows