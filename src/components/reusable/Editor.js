import React, {useState, useContext} from 'react'
import Header from '../../assets/images/header.jpg'
import Close from '../../assets/images/close.svg'
import { AuthContext } from '../../contexts/AuthContext'
import {updateDoc } from "firebase/firestore";

function Editor({isActiveEdit, setEditActive}) {

  const { userData, usersRef } = useContext(AuthContext)
  const [updateName, setUpdateName] = useState('')
  const [updateBio, setUpdateBio] = useState('')
  const [updateUserAt, setUpdateUserAt] = useState("");

  const updateProfileInfo = async () => {
    await updateDoc(usersRef, {name: updateName, bio: updateBio})
  }; 


  return (
    <>
     {userData.map((user) => 
    <div className={isActiveEdit ? 'profile-editor-div active' : 'profile-editor-div'}>
    <div onClick={() => setEditActive(false)}className={isActiveEdit ? 'backdrop active' : 'backdrop' }></div>
        <div className='editor'>
            <div className="editor-header ">
                <img src={Close} className="close-icon" onClick={() => setEditActive(false)} alt='close-img'/>
                <h2>Edit profile</h2>
                <button onClick={() => {updateProfileInfo(); setEditActive(false)}}>Save</button>
            </div>
            <div className='change-header header'>
                  <img src={Header} alt='profile header'></img>
                </div>
            <div className="editor-body">    
                <div className='change-profile-img pi-avatar-edit'>
                  <div className='pi-avatar'></div>
                </div>
                <div className='change-name'>
                  <input type='text' onChange={(e) => setUpdateName(e.target.value)} defaultValue={user.name}/>
                </div>
                <div className='change-bio'>
                  <input type='text' placeholder='Bio' onChange={(e) => setUpdateBio(e.target.value)} defaultValue={user.bio} />
                </div>
                <div className='change-location'>
                  <input type='text' placeholder='Location' /> 
                </div>
                <div className='change-website'>
                  <input type='text' placeholder='Website'/>
                </div>
            </div>
        </div>
    </div>
     )}
    </>
  )
}

export default Editor