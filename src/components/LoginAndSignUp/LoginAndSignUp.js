import React, { useState } from 'react'
import TwitterIcon from '../../assets/images/twitter.jpg'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import Close from '../../assets/images/close.svg'
import SignUpForm from './SignUpForm'

function LoginAndSignUp() {

  const [needLogin, setNeedLogin] = useState(true);
  const [signUpFormActive, setSignupFormActive] = useState(false)
  
  return (
    <div className="sign-page-wrapper">
      <div className="sign-page">
        <div className="sign-div">
          <div className="sign-icon">
            <div className="close">
              <div>
                 <img src={Close} className="close-icon" alt='close-img'/>
              </div>    
            </div>
            <img
              src={TwitterIcon}
              className="twitter-icon"
              alt="twitter icon"
            />
          </div>
          {needLogin ? (
            <LoginPage setNeedLogin={setNeedLogin} />
          ) : (
            <SignUpPage setNeedLogin={setNeedLogin} setSignupFormActive={setSignupFormActive} /> 
          )}
        <SignUpForm signUpFormActive={signUpFormActive} setSignupFormActive={setSignupFormActive} />
        </div>
        <footer className="login-footer">
          <div className="login-empty"></div>
          <div className="footer-div">
            <div className='footer-text'>
              <h2>Don't miss what's happening</h2>
              <h3>People on Twitter are the first to know.</h3>
            </div>
            <div className='footer-btns'>
              <button onClick={() => setNeedLogin(true)}>Login</button>
              <button onClick={() => setNeedLogin(false)}>Sign Up</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LoginAndSignUp