import React, {useState, useEffect} from 'react'
import AccountCard from './AccountCard'
import Close from '../../assets/images/close.svg'
import FeedLoadingScreen from './FeedLoadingScreen';
import { query, onSnapshot, collection, where } from "firebase/firestore";
import { useLocation, useParams, matchPath } from 'react-router-dom';
import { db } from "../../firebase";


function UsersList({ tweetID, type, clear, noBio }) {

    const [accounts, setAccounts] = useState([]);
    const usersRef = collection(db, 'users');

	useEffect(() => {
		
			const q = query(usersRef, where(type, "array-contains", tweetID));
   
			onSnapshot(q, (querySnapshot) => {
				let accountDatas = [];
				querySnapshot.forEach((account) => {
					const data = account.data();
						accountDatas.push(
							<AccountCard
								key={account.id}
								id={account.id}
								name={data.name}
								at={data.at}
							/>
						);
						setAccounts(accountDatas);
					})
			})
	}, [tweetID, type, noBio]);


  return (
	<div className='modal-div active'>
		<div className='backdrop active'></div>
    	<div className="modal">
			<div className="modal-header">
				<img src={Close} className="close-icon" onClick={() => clear()} alt='close-img'/>					<h3>{type === "retweets" ? "Retweeted by" : "Liked by"}</h3>
			</div>
			<div className='modal-body'>
				{accounts.length ? accounts : <FeedLoadingScreen />}
			</div>
			
		</div>
	</div>
  )
}

export default UsersList