/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react'
import BirthdayIcon from '../assets/images/profile-info-icons/birthday.svg'
import CalendarIcon from '../assets/images/profile-info-icons/calendar.svg'
import LockIcon from '../assets/images/profile-info-icons/lock.svg'
import BackIcon from '../assets/images/profile-info-icons/back.svg' 
import WebsiteIcon from '../assets/images/profile-info-icons/website.svg' 
import { AuthContext } from '../contexts/AuthContext'
import Editor from './reusable/Editor'
import { doc, onSnapshot } from "firebase/firestore";
import { useOutletContext, Link } from "react-router-dom";
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/index'
import ProfileFeed from './reusable/ProfileFeed'
import FollowButton from './reusable/FollowButton'


function ProfilePage() {

  const { userProfile, profileID } = useOutletContext();

  const {
    userName,
    userImage,
    userAt,
    userID,
    userFollows,
    userFollowers,
    userBio,
    userJoinDate,
    userTweets,
    usersRef,
    userBornDay,
    userBornMonth,
    userBornYear,
    userWebsite,
    userHeader
  } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    follows: [],
    followers: [],
  });

  const [isActiveEdit, setEditActive] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(userImage);
  const [previewHeader, setPreviewHeader] = useState(userHeader)
	const [followed, setFollowed] = useState(false);

  useEffect(() => {
    document.title = `@${userAt} / Twitter`;
  }, []);

 
  useEffect(() => {
		
    const storageAvatarRef = ref(storage, "avatars/" + profileID + '.png')
    const storageHeaderRef = ref(storage, "headers/" + profileID + '.png')
    userProfile 
      ?
      setProfileData((prevData) => ({ ...prevData, header: userHeader }))
      :
        getDownloadURL(storageHeaderRef).then((url) => {
          setProfileData((prevData) => ({ ...prevData, header: url }))
        })
        .catch((e) => {
          console.log(e);
          setProfileData((prevData) => ({ ...prevData, header: BirthdayIcon }));
        });

		userProfile
			?
			  setProfileData((prevData) => ({ ...prevData, image: userImage }))
			:
        getDownloadURL(storageAvatarRef).then((url) => {
          setProfileData((prevData) => ({ ...prevData, image: url }))
          })
					.catch((e) => {
						console.log(e);
						setProfileData((prevData) => ({ ...prevData, image: BirthdayIcon }));
					});
	}, [profileID, userImage, userProfile, userHeader]);



  useEffect(() => {
    setProfileData((n) => ({ ...n, follows: [], followers: [] }));

    userProfile
      ? setProfileData((n) => ({
          ...n,
          at: userAt,
          name: userName,
          follows: userFollows || [],
          followers: userFollowers || [],
          dayOfBirth: userBornDay,
          monthOfBirth: userBornMonth,
          yearOfBirth: userBornYear,
          id: userID,
          bio: userBio,
          website: userWebsite,
          image: userImage,
          tweetAmount: userTweets.length,
          joinDate: new Date(userJoinDate.seconds * 1000),
        }))
      : onSnapshot(doc(usersRef, profileID), (doc) => {
          let data = doc.data();
          setProfileData((prevData) => ({
            ...prevData,
            at: data.at,
            name: data.name,
            follows: data.follows || [],
            followers: data.followers || [],
            dayOfBirth: data.dayOfBirth,
            monthOfBirth: data.monthOfBirth,
            yearOfBirth: data.yearOfBirth,
            bio: data.bio,
            id: doc.id,
            website: data.website || "",
            tweetAmount: data.tweets.length,
            joinDate: new Date(data.joinDate.seconds * 1000),
          }));
        });
  }, [
    usersRef,
    userProfile,
    profileID,
    userAt,
    userID,
    userName,
    userBio,
    userJoinDate,
    userFollowers,
    userFollows,
    userTweets,
    userBornDay,
    userBornMonth,
    userBornYear,
    userWebsite,
    userImage
  ]);

  useEffect(() => {
		if (userID && userFollows) {
			!userProfile && setFollowed(userFollows.includes(profileID));
		}
	}, [userProfile, userFollows, profileID, userID]);

  return (
    <>
      <div>
        <div className="back-from-profile">
          <div className="back-icon">
            <Link to={`/`}>
              <img src={BackIcon} alt="lock" />
            </Link>
          </div>
          <div>
            <div className="bfp-nickname">
              {profileData.name}
              <img src={LockIcon} alt="lock" />
            </div>
            <div className="bfp-tweetcount">{profileData.tweetAmount} Tweets</div>
          </div>
        </div>
        <div className="profile-div">
          <div className="header">
            <img className='profile-header' src={profileData.header} alt="profile header"></img>
          </div>
          <div className="profile-info">
            <div className="pi-avatar-edit">
              <div className="pi-avatar" style={{backgroundImage: `url(${profileData.image})`}}></div>
              {userProfile ? 
              <div className="pi-edit-profile-btn">
                <button onClick={() => setEditActive(true)}>
                  Edit profile
                </button>
                <Editor
                  isActiveEdit={isActiveEdit}
                  setEditActive={setEditActive}
                  setPreviewAvatar={setPreviewAvatar}
                  previewAvatar={previewAvatar}
                  previewHeader={previewHeader}
                  setPreviewHeader={setPreviewHeader}
                />
              </div>
              : userID && (
               <FollowButton  setFollowed={setFollowed} tweeterID={profileID} followed={followed} />
              )
              }
            </div>
            <div className="pi-acc-names">
              <div className="pi-acc-nickname">
                <span>
                  {profileData.name} <img src={LockIcon} alt="locked acc" />
                </span>
              </div>
              <div className="pi-acc-username">@{profileData.at}</div>
            </div>
            <div className="pi-bio">
              {profileData.bio ? <p>{profileData.bio}</p> : ""}
            </div>
            <div className="pi-personal-info">
              {profileData.website ?
              <span>
                <img src={WebsiteIcon} alt="website icon" />
                <a href={`${profileData.website}`} target="_blank" rel="noreferrer">{profileData.website}</a>
                </span>
                : 
                <span style={{display:'none'}}></span>
              }
              <span>
                <img src={BirthdayIcon} alt="birthday icon" /> Born{" "}
                {profileData.monthOfBirth} {profileData.dayOfBirth},{" "}
                {profileData.yearOfBirth}
              </span>
              <span>
                <img src={CalendarIcon} alt="calendar icon" /> Joined{" "}
                  {String(profileData.joinDate).slice(4, 8) +
                  String(profileData.joinDate).slice(11, 16)}
              </span>
            </div>
            <div className="pi-following">
              <div>
                <span className="following-number">
                {profileData.follows.length - 1}
                </span>
                <span className="following-text">Following</span>
              </div>
              <div>
                <span className="following-number">
                  {profileData.followers.length - 1 }
                </span>
                <span className="following-text">Followers</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <nav className="profile-nav">
            <li>
              <div className="profile-nav-tweets">
                Tweets
                <div></div>
              </div>
            </li>
            <li>
              <div>Tweets & replies</div>
            </li>
            <li>
              <div>Media</div>
            </li>
            <li>
              <div>Likes</div>
            </li>
          </nav>
          <div className="profile-content">
            <ProfileFeed profileID={profileID} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage