import React, {useState} from 'react'

function UsersList() {

    const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		db.collection("users")
			.where(type, "array-contains", tweetID)
			.get()
			.then((snapshot) => {
				let accountDatas = [];
				snapshot.forEach((account) => {
					const data = account.data();
					accountDatas.push(
						<AccountCard
							key={account.id}
							bio={noBio ? "" : data.bio}
							id={account.id}
							name={data.name}
							at={data.at}
						/>
					);
				});

				setAccounts(accountDatas);
			});
	}, [tweetID, type, noBio]);


  return (
    <div>UsersList</div>
  )
}

export default UsersList