import React, { useState} from 'react'
import Close from '../../assets/images/close.svg'
import { YearOfBirth, DayOfBirth } from '../../utilities/DateOfBirth'
import { useNavigate } from 'react-router-dom'
import { setDoc, doc} from "firebase/firestore";
import { auth, db } from '../../firebase/index'
import { createUserWithEmailAndPassword } from 'firebase/auth';

const days = DayOfBirth()
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const years = YearOfBirth()


function SignUpForm({ signUpFormActive, setSignupFormActive}) {

  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [name, setName] = useState('')
  const [dayOfBirth, setDayOfBirth] = useState('')
  const [monthOfBirth, setMonthOfBirth] = useState('')
  const [yearOfBirth, setYearOfBirth] = useState('')
  const [userAt, setUserAt] = useState("");


  const handleSignUp = (e) => {
    e.preventDefault()
    
			createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((cred) => {
        setDoc(doc(db, 'users', cred.user.uid), {
            name: name,
            bio: '',
            dayOfBirth,
            monthOfBirth,
            yearOfBirth,
            likes: [],
            tweets: [],
            follows: [cred.user.uid],
            followers: [cred.user.uid],
            joinDate: new Date(),
            at: userAt,
          })
          .then(() => {
            navigate('/')
          });
        })
  };



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
              <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} required/>
              <input type="text" placeholder='Email' onChange={(e) => setRegisterEmail(e.target.value)}/>
              <input type="password" placeholder='Password' onChange={(e) => setRegisterPassword(e.target.value)}/>
            </div>
            <div className='signup-dates'>
              <h2>Date of birth</h2>
              <p>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
              <div>
                <div className='select-div'>
                  <label>Day</label>
                  <select  onChange={(e) => setDayOfBirth(e.target.value)} value={dayOfBirth}> 
                    <option disabled></option>
                    {days.map((day, i) => 
                    <option key={i}value={day}>{day}</option>
                    )}
                  </select>
                </div>
                <div className='select-div'>
                  <label>Month</label>
                    <select value={monthOfBirth} onChange={(e) => setMonthOfBirth(e.target.value)}> 
                      <option disabled></option>
                      {months.map((month, i) => 
                      <option key={i} value={month}>{month}</option>
                  )}
                </select>
                </div>
                <div className='select-div'>
                <label>Year</label>
                  <select value={yearOfBirth} onChange={(e) => setYearOfBirth(e.target.value)}> 
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


