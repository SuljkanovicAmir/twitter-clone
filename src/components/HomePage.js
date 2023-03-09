import React, {useEffect, useState, useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { db} from "../firebase/index";
import Feed from './reusable/Feed';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import NavProfile from './reusable/NavProfile'
import Toast from "./reusable/Toast";
import { useOutletContext } from "react-router-dom";
import FeedLoadingScreen from './reusable/FeedLoadingScreen';
import { HidingHeader } from 'hiding-header-react'

function HomePage() {

    useEffect(() => {
        document.title = 'Home / Twitter';
    }, []);

    const { userID, userFollows  } = useContext(AuthContext);
	const [tweetData, setTweetData] = useState([]);
    const tweetRef = collection(db, 'tweets');
    const { toast, setToast } = useOutletContext();
	const [stopperUserFollows, setStopperUserFollows] = useState([]);
   



    useEffect(() => {	
        setTweetData([]);

        const q = query(tweetRef, orderBy("timeStamp", "desc"));
        
        const unsub =  onSnapshot(q, (querySnapshot) => {
            let tempArray  = [];
            let deletionArray = [];

            const changes = querySnapshot.docChanges();
            changes.forEach((change) => {
                if (change.type === "removed") {
                    deletionArray.push(change.doc.id);
                }
            });

                querySnapshot.forEach((doc) => {
                    if (!doc.data().replyTo) {
                tempArray.push({ ...doc.data(), id: doc.id });
                    }
            });
            setTweetData(tempArray.filter((doc) => !deletionArray.includes(doc.id)));
        });
    
        return () => unsub();

    }, []);


  return (
    <>
    <div className='home'>
    <HidingHeader>
			<header>
            <div className={`home-header`} >
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
        </header>
		</HidingHeader>
        {tweetData.length ? <Feed tweetData={tweetData}/> : <FeedLoadingScreen/>}
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











