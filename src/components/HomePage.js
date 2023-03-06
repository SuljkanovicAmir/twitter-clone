import React, {useEffect, useState, useContext} from 'react'
import CreateTweet from './reusable/CreateTweet'
import { AuthContext } from '../contexts/AuthContext';
import { db} from "../firebase/index";
import Feed from './reusable/Feed';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import NavProfile from './reusable/NavProfile'
import Toast from "./reusable/Toast";
import { useOutletContext } from "react-router-dom";


function HomePage() {


    useEffect(() => {
        document.title = 'Home / Twitter';
    }, []);

    const { userID, userFollows  } = useContext(AuthContext);

	const [tweetData, setTweetData] = useState([]);
    const tweetRef = collection(db, 'tweets');
    const { toast, setToast } = useOutletContext();

    useEffect(() => {	
       
        const q = query(tweetRef, orderBy("timeStamp", "desc"));
        onSnapshot(q, (querySnapshot) => {
            let finalArray = [];
        querySnapshot.forEach((doc) => {
            if (!doc.data().replyTo) {
                finalArray.push({ ...doc.data(), id: doc.id });
            }
            setTweetData(finalArray);
          });
        });

    }, [userID]);


  

  


  return (
    <>
    <div className='home'>
        <div className='home-header'>
            <div className='header-title'>
                <span>Home</span>
            </div>
            <div className='header-buttons-div'>
                <div>
                    <span>For You</span>
                    <div className='orange-underline'></div>
                </div>
                <div className='header-home-following-btn'>
                    <span>Following</span>
                </div>
            </div>   
            <NavProfile />
        </div>
        <CreateTweet toast={toast} setToast={setToast} />
        {tweetData.length ? <Feed tweetData={tweetData}/> : <></>}
    </div>
    {toast ? (
		<Toast message={toast} />
		) : (
             ""
        )}
    </>
  )
}

export default HomePage











