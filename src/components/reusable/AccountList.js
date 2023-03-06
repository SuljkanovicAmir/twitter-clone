import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import FeedLoadingScreen from './FeedLoadingScreen'
import { query, onSnapshot, collection, where } from "firebase/firestore";
import AccountCard from './AccountCard'
import { useLocation, useParams, matchPath } from 'react-router-dom';


const AccountList = ({ profileID, name }) => {


    const [accounts, setAccounts] = useState([]);
    const usersRef = collection(db, 'users');
    const { urlAt } = useParams();

    const { pathname } = useLocation()
    const params =  matchPath({ path: `/${urlAt}/:url` }, pathname,)

    const url = params.params.url;

    

    useEffect(() => {
		if (url.includes("following")) {
			document.title = `People followed by ${name}`;
		} else {
			document.title = `People following ${name}`;
		}
	}, [name, url]);

    
    useEffect(() => {
        const q = query(usersRef, where(url.includes("following") ? "followers" : "follows", "array-contains", profileID));
   
        onSnapshot(q, (querySnapshot) => {
            let accountDatas = [];
            querySnapshot.forEach((account) => {
                const data = account.data();
                
                if (account.id !== profileID) {
                    accountDatas.push(
                        <AccountCard
                            key={account.id}
                            id={account.id}
                            name={data.name}
                            at={data.at}
                        />
                    );
                }
            })
            setAccounts(accountDatas);
        })

    
    },[url]);

    return <div className="feed">{accounts.length ? accounts : <FeedLoadingScreen />}</div>;

}


export default AccountList