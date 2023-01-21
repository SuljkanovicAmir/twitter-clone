import React from 'react'
import Tweet from './Tweet'

function HomePage() {
  return (
    <div>
        <div className='home-header'>
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
        </div>
        <Tweet />
    </div>
  )
}

export default HomePage