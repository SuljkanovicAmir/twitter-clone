/* eslint-disable no-restricted-globals */
import React, {useState, useContext, useEffect} from 'react'
import Close from '../../assets/images/close.svg'
import { AuthContext } from '../../contexts/AuthContext'
import {updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase/index";
import resizeFile from '../functions/resizeFile';
import CameraIcon from '../../assets/images/camera.svg'
import { uploadBytes, ref } from 'firebase/storage';

function Editor({isActiveEdit, setEditActive, previewAvatar, setPreviewAvatar, previewHeader, setPreviewHeader}) {

  const {
    userName,
    userBio,
    userID,
    userWebsite,
    currentUser,
    userImage,
    userHeader
} = useContext(AuthContext);

  const [updateName, setUpdateName] = useState(userName)
  const [updateBio, setUpdateBio] = useState(userBio)
  const [updateAvatar, setUpdateAvatar] = useState(userImage)
  const [updateHeader, setUpdateHeader] = useState(userHeader)
  const [updateWebsite, setUpdateWebsite] = useState(userWebsite);
  const userRef = doc(db, 'users', userID);

  useEffect(() => {
		if (updateAvatar !== userImage) {
			setPreviewAvatar(URL.createObjectURL(updateAvatar));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateAvatar, userImage]);

	useEffect(() => {
		if (updateHeader !== userHeader) {
      console.log('hi')
			setPreviewHeader(URL.createObjectURL(updateHeader));
      
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateHeader, userHeader]);



  const handleSubmit = (e) => {
    e.preventDefault()
    if(currentUser) {
       updateDoc(userRef, {
        name: updateName || "", 
        bio: updateBio || "", 
        website: updateWebsite || ""
    });

    
    if (updateAvatar !== userImage) {
      const storagAvatareRef = ref(storage, ("avatars/" + userID + '.png'))
      uploadBytes(storagAvatareRef, updateAvatar)
    }
    if (updateHeader !== userHeader) {
      const storageHeaderRef = ref(storage, ("headers/" + userID + '.png'))
      uploadBytes(storageHeaderRef, updateHeader)
    }
   
    if (updateHeader === userHeader && updateAvatar === userImage) {
      setEditActive(false);
    }
    import("../functions/updateName").then((update) =>
						update.default(userID, updateName)
					)
      

    setEditActive(false)
  }}

  const handleAvatarChange = async (e) => {
		if (e.target.files[0]) {
			const file = e.target.files[0];
			const blob = await resizeFile(file, 133, 133);
			setUpdateAvatar(blob);
		} else {
			console.log("Fail");
		}
	};


  const handleHeaderPicChange = async (e) => {
		if (e.target.files[0]) {
			const file = e.target.files[0];
			const blob = await resizeFile(file, 599, 199);
			setUpdateHeader(blob);
		} else {
			console.log("set header fail");
		}
	};


  return (
    <>
    <div className={isActiveEdit ? 'modal-div active' : 'modal-div'}>
    <div onClick={() => setEditActive(false)}className={isActiveEdit ? 'backdrop active' : 'backdrop' }></div>
        <div className='modal'>
            <div className="modal-header ">
                <img src={Close} className="close-icon" onClick={() => setEditActive(false)} alt='close-img'/>
                <h2>Edit profile</h2>
                <button onClick={(e) => handleSubmit(e)}>Save</button>
            </div>
            <div className='change-header header'>
                  <img src={previewHeader} className='header-preview-img' alt='profile header' />
                  <label className='header-input-label' htmlFor="header-input">
                      <img src={CameraIcon} alt="changeAvatar" />
                    </label>
                  <input
                    id="header-input"
                    type="file"
                    accept="image/*"
                    onChange={handleHeaderPicChange}
                  />
                </div>
            <div className="modal-body">    
                <div className='change-profile-img pi-avatar-edit'>
                  <div className='pi-avatar' style={{backgroundImage: `url(${previewAvatar})`}}>
                    <label className='avatar-input-label' htmlFor="avatar-input">
                      <img src={CameraIcon} alt="changeAvatar" />
                    </label>
                    <input
                      id="avatar-input"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>
                <div className='change-name'>
                  <input type='text' maxLength={25} onChange={(e) => setUpdateName(e.target.value)} defaultValue={userName}/>
                </div>
                <div className='change-bio'>
                  <input type='text' maxLength={125} placeholder='Bio' onChange={(e) => setUpdateBio(e.target.value)} defaultValue={userBio} />
                </div>
                <div className='change-location'>
                  <input type='text' placeholder='Location'  /> 
                </div>
                <div className='change-website'>
                  <input type='text' maxLength={100} placeholder='Website' onChange={(e) => setUpdateWebsite(e.target.value)} defaultValue={userWebsite}  />
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Editor