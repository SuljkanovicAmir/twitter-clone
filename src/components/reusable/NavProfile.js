import React, {useContext} from 'react'
import Dots from '../../assets/images/dots.svg'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'



function NavProfile() {

    const { userAt, userImage, userName } = useContext(AuthContext);


  return (
    <div className="nav-acc-name">   
        <div className='avatar'>
            <NavLink to={`/${userAt}`}>
                <img src={userImage} alt='icon'/>
            </NavLink>
        </div>
        <div>
            <div className='nav-acc-nickname'>
                {userName} 
            </div>
            <div className='nav-username'>
                @{userAt}
            </div>
        </div>
        <div className='nav-acc-dots'>
            <img src={Dots} alt='dots' />
        </div>
    </div>
  )
}

export default NavProfile