import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { IonButton } from '@ionic/react';
import CreateAccount from './CreateAccount';
import Login from './Login';

const Onboarding = ({ setShowBoarding, signUp, setSignUp }) => {
  let nextId = 0
  const boarding = [
    {
      id: nextId++,
      questionText: 'I’m Harper. I will help your doctor get the information they need to understand your health.',
      answerOptions: [
        { answerText: 'Next', isTrue: true },
      ],
    },
    {
      id: nextId++,
      questionText: 'Click the "Help ?" button in the navigation bar on the top right for help or explanations at any time.',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Next', isTrue: true },
      ],
    },
    {
      id: nextId++,
      questionText: 'You can watch these videos at any time, or arrange to talk to our team.',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Next', isTrue: true },
      ],
    },
    {
      id: nextId++,
      questionText: 'First I’d like to know more about you.',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Next', isTrue: true },
      ],
    },
    {
      id: nextId++,
      questionText: 'After, I will show you how to use me. It’s very easy! But first, let me sign you up!',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Begin Sign up', isTrue: true },
      ],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [showSignUp, setShowSignUp] = useState(false)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [message, setMessage] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  let navigate = useNavigate()

  // handle flow of onboarding
  const handleAnswer = (isTrue) => {
    if (isTrue) {
      const next = current + 1; // move forward
      if (next < boarding.length) {
        setCurrent(next);
      } else if (boarding.length) {
        setShowSignUp(true) // show signup
      }
    } else {
      const prev = current - 1; // move back
      if (prev >= 0) {
        setCurrent(prev);
      }
    }
  };

  // close button 
  const handleClick = () => {
    setShowBoarding(false)
    document.getElementById("overlay").style.display = "none";
  }

  // show sign up 
  const handleSignUp = () => {
    setSignUp(true)
    setShowSignUp(true)
  }

  // show login
  const handleLogIn = () => {
    setSignUp(false)
    setShowSignUp(false)
  }

  // handle submit button, add new users to backend
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (signUp && (password !== confirmPassword)) {
        setMessage("Passwords should match!")
        return
      }

      // sign up, or login, pass to backend
      const response = await axios.post('//' + process.env.REACT_APP_API_HOST + `/${signUp ? 'signup' : 'login'}`, { email, password })

      setCookie('AuthToken', response.data.token)
      setCookie('UserId', response.data.userId)

      const success = response.status === 201

      if (success && signUp) {
        setMessage("Welcome!")
        navigate('/baseline') // sign up success
      } else if (success && !signUp) {
        navigate('/myaccount') // log in success
        window.location.reload()
      } else if (response.data.userExists) {
        setMessage(response.data.message) // sign up fail: user exists
      } else if (response.data.loginInvalid) {
        setMessage(response.data.message) // login fail: new user or incorrect pw
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="onboarding">
      <div className="onboarding-content">
        <div className="close-section">
          <button id="close" onClick={handleClick}>ⓧ <span>close</span></button>
        </div>
        <div className="border">
          {signUp ? (
            showSignUp ? (
              <CreateAccount
                handleSubmit={handleSubmit}
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                message={message} />
            ) : (
              <>
                <div className="instruction">
                  <h3>{boarding[current].questionText}</h3>
                </div>
                <div className="response-section">
                  <div className="response">
                    {boarding[current].answerOptions.map((answerOption, index) => (
                      <button key={index} onClick={() => handleAnswer(answerOption.isTrue)}>
                        {answerOption.answerText}</button>
                    ))}
                  </div>
                </div>
              </>)
          ) : (
            <Login
              handleSubmit={handleSubmit}
              setEmail={setEmail}
              setPassword={setPassword}
              message={message} />
          )}
          <div id="change">
            <IonButton expand="block" fill="clear" onClick={signUp ? handleLogIn : handleSignUp}>
              {signUp ? <div>Already a user? Log in here.</div> : <div>New User? Sign up here.</div>}
            </IonButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
