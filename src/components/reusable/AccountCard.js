import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/index'
import BirthdayIcon from '../../assets/images/profile-info-icons/birthday.svg'
import FollowButton from "./FollowButton";
import { AuthContext } from "../../contexts/AuthContext";
import Dots from '../../assets/images/dots.svg'



const AccountCard = (props) => { 
    
    const { bio, id, name, at } = props;
	const { userFollowers , userFollows } = useContext(AuthContext);
	const [image, setImage] = useState("");
    
	const storageAvatarRef = ref(storage, "avatars/" + id + '.png')



 useEffect(() => {
    getDownloadURL(storageAvatarRef).then((url) => {
           setImage(url);
        })
        .catch((e) => {
            console.log(e);
            setImage(BirthdayIcon);
        });
 },[id])

 return (

    <div className="account-card">
			<Link to={`/${at}`}>
				{image ? (
					<img className="avatar" alt="user-profile" src={image} />
				) : (
					<div className="avatar" />
				)}
			</Link>
		
			<div>
				<p className="tweeter-name nav-acc-nickname">{name}</p>
				<p className="tweeter-at nav-username">{at}</p>
                {bio ? <p>{bio}</p> : ""}
			</div>
			<div className="account-card-btn">
                {userFollows && (
						<FollowButton
							tweeterID={id}
							account={true}
							small={true}
							followed={userFollows.includes(id)}
						/>
					)}
            </div>
            <div className='nav-acc-dots'>
              <img src={Dots} alt='dots' />
            </div>
	</div>


 )


}



export default AccountCard