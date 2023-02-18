import React, {useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext';


function FollowButton(props) {

 const { tweeterID, followed, setFollowed } = props;
 const { userID, userFollows } = useContext(AuthContext);

 const follow = () => {
    import("../functions/follow.js").then((follow) =>
        follow.default(tweeterID, userID, userFollows)
    );
    console.log('follow')
};

const unfollow = () => {
    import("../functions/unfollow.js").then(unfollow => 
        unfollow.default(tweeterID, userID, userFollows))
};



  return (
    <div className="pi-follow-profile-btn" onClick={() => setFollowed(prev => !prev)}>
        <button  onClick={followed ? unfollow : follow}>
            {followed ? "Following" : "Follow"}
        </button>
    </div>
  )
}

export default FollowButton