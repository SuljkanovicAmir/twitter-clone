import React, {useEffect, useState, useContext} from 'react'
import CreateTweet from './reusable/CreateTweet'
import { AuthContext } from '../contexts/AuthContext';
import { db} from "../firebase/index";
import Feed from './reusable/Feed';
import { collection, onSnapshot, doc, query, orderBy, getDocs } from "firebase/firestore";
import NavProfile from './reusable/NavProfile'


function HomePage() {

  


    useEffect(() => {
        document.title = 'Home / Twitter';
    }, []);

    const { userID, usersRef } = useContext(AuthContext);

	const [tweetData, setTweetData] = useState([]);
    const tweetRef = collection(db, 'tweets');

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
        <CreateTweet />
        {tweetData.length ? <Feed tweetData={tweetData}/> : <></>}
    </div>
  )
}

export default HomePage












/*   
twts frop people you follow, add argument in

 let tempArray = [];

onSnapshot(doc(usersRef, userID), (doc) => {
            console.log(doc.data().tweets)
            doc.data().tweets && tempArray.push(...doc.data().tweets);
            return tempArray;
        })


         onSnapshot(q, (querySnapshot) => {
            let finalArray = [];
        querySnapshot.forEach((doc) => {
            if (tempArray.includes(doc.id) && !doc.data().replyTo) {
                finalArray.push({ ...doc.data(), id: doc.id });
            }
            setTweetData(finalArray);
          });
        });
   */