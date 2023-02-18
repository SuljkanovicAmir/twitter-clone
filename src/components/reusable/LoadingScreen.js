import React from 'react'
import Logo from '../../assets/images/twitter.jpg'

function LoadingScreen() {
  return (
    <div className='loading-screen'>
        <div className='loading-screen-logo'>
            <img src={Logo}  alt="logo"/>
        </div>
    </div>
  )
}

export default LoadingScreen
