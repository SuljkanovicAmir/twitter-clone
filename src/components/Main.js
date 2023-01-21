import React from 'react'
import {Outlet } from "react-router-dom"
import Sidebar from './Sidebar'
import Navigation from './Navigation'

function Main() {
  return (
   <div className='logged-in'>
      <Navigation />
      <div className="main">
         <div className='main-content'>
            <div className='content'>
               <Outlet />
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