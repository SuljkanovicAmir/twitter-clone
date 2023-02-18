import React from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate  } from 'react-router-dom'





function LoginPage({ setNeedLogin }) {

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  let navigate = useNavigate();
  const { signIn } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
       await signIn(loginEmail, loginPassword )
        navigate('/')
    } catch (err) {
        console.log(err.message)
    }
  };

  



   
  return (
    <>
    <div className='sign-form'>
        <h1 className='sign-title'>Sign in to Twitter</h1>
        <button className='google-btn'>Sign in with Google</button>
        <button className='apple-btn'>Sign in with Apple</button>
        <div className='sign-line-div'>
            <div className='sign-break-line'></div>
            <div className='sign-break-line-m'>or</div>
            <div className='sign-break-line'></div>
        </div>
        <input type="text" placeholder='Email'  onChange={(e) => setLoginEmail(e.target.value)}  />
        <input type="password" placeholder='Password'  onChange={(e) => setLoginPassword(e.target.value)}  />
        <button className='next-btn' onClick={(e) => handleLogin(e)} >Sign In</button>
        <button className='fp-btn'>Forgot password?</button>
        <div className='no-acc-div'>
            Don't have an account? 
            <span role='button' onClick={() => setNeedLogin(false)}> Sign up</span>
        </div>
    </div>
    </>
  )
}

export default LoginPage;

