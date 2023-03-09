import React, {useState} from 'react'
import {Outlet } from "react-router-dom"
import Sidebar from './Sidebar'
import Navigation from './Navigation'

function Main() {


   const [toast, setToast] = useState(false);

 
  return (
   <div className='logged-in'>
      <Navigation toast={toast} setToast={setToast} />
      <div className="main">
         <div className='main-content'>
            <div className='content'  >
               <Outlet context={{toast, setToast}}/>
            </div>
            <div>
               <Sidebar />
            </div>
         </div>
      </div>
   </div>
   
  )
}

export default Main