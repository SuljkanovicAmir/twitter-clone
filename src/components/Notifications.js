import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from '../firebase';
import NotificationsFeed from './reusable/NotificationsFeed';

function Notifications() {

    const { userID } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const usersRef = collection(db, 'users');

    useEffect(() => {
		document.title = "Notifications / Twitter";
	}, []);

  /*
    useEffect(() => {
        setNotifications([]);
        const unsub = onSnapshot(doc(usersRef, userID), (doc) => {
            if (doc.data().notifications) {
				setNotifications(
					doc
						.data()
						.notifications
				);
			}
		});
        return () => unsub();
    }, [userID]);

    */

  return (
    <div className="feed">
			<NotificationsFeed notifications={notifications} />
		</div>
  )
}

export default Notifications