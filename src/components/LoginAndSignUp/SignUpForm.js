import React, {useCallback, useContext, useState} from 'react'
import Close from '../../assets/images/close.svg'
import { YearOfBirth, DayOfBirth } from '../../utilities/DateOfBirth'
import  { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/index'
import { useNavigate } from 'react-router-dom'
import { withRouter } from '../../utilities/withRouter'

const days = DayOfBirth()
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const years = YearOfBirth()


function SignUpForm({ signUpFormActive, setSignupFormActive}) {
  const history = useNavigate();
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')



  const handleSignUp = useCallback(async e => {
    e.preventDefault()
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, 
        registerPassword)
        history('/')
    } catch (err) {
        console.log(err.message)
    }
  }, [history])

  

  return (
    <div className={signUpFormActive ? 'sign-up-form-div active' : 'sign-up-form-div'}>
         <div className="sign-icon">
            <div className="close">
              <div onClick={() => setSignupFormActive(false)}>
                 <img src={Close} className="close-icon" alt='close-img'/>
              </div>    
            </div>
        </div>
        <div className='signup-form'>
            <h1 className='sign-title'> Create your account </h1>
            <div className='signup-name-email'>
              <input type="text" placeholder='Name' required/>
              <input type="text" placeholder='Email' onChange={(e) => setRegisterEmail(e.target.value)}/>
              <input type="password" placeholder='Password' onChange={(e) => setRegisterPassword(e.target.value)}/>
            </div>
            <div className='signup-dates'>
              <h2>Date of birth</h2>
              <p>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
              <div>
                <div className='select-div'>
                  <label>Day</label>
                  <select defaultValue=''> 
                    <option disabled></option>
                    {days.map((day, i) => 
                    <option key={i}value={day}>{day}</option>
                    )}
                  </select>
                </div>
                <div className='select-div'>
                  <label>Month</label>
                    <select defaultValue=''> 
                      <option disabled></option>
                      {months.map((month, i) => 
                      <option key={i} value={month}>{month}</option>
                  )}
                </select>
                </div>
                <div className='select-div'>
                <label>Year</label>
                  <select defaultValue=''> 
                  <option disabled></option>
                  {years.map((year, i) => 
                    <option key={i} value={year}>{year}</option>
                  )}
                  </select>
                </div>
                
              </div>
            </div>
            <button className='signup-btn' onClick={(e) => handleSignUp(e)}>Sign up</button>
        </div>
    </div>
    
  )
}


export default SignUpForm;

