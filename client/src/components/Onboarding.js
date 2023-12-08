import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { IonButton } from '@ionic/react';

const Onboarding = ({ setShowBoarding, signUp }) => {
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
  const [confirmPassword, setComfirmPassword] = useState(null)
  const [message, setMessage] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  let navigate = useNavigate()
  console.log(email, password, confirmPassword)

  // handle flow of onboarding
  const handleAnswer = (isTrue) => {
    if (isTrue) {
      // Move forward when "Next" is clicked
      const next = current + 1;
      if (next < boarding.length) {
        setCurrent(next);
      } else if (boarding.length) {
        setShowSignUp(true) // show signup
      }
    } else {
      // Move backward when "Back" is clicked
      const prev = current - 1;
      if (prev >= 0) {
        setCurrent(prev);
      }
    }
  };

  // close button 
  const handleClick = () => {
    setShowBoarding(false)
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
      const response = await axios.post(`http://localhost:8080/${signUp ? 'signup' : 'login'}`, { email, password })

      setCookie('AuthToken', response.data.token)
      setCookie('UserId', response.data.userId)

      const success = response.status === 201

      if (success && signUp) {
        setMessage("Welcome")
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
        {signUp ? (
          <div className="first-steps">
            {!showSignUp && (
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
              </>
            )}
            {showSignUp && (
              <div className="account-form">
                <h2>Create Account</h2>
                <div id="center"><hr /></div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    id="check-password"
                    name="check-password"
                    placeholder="Confirm Password"
                    required={true}
                    onChange={(e) => setComfirmPassword(e.target.value)}
                  />
                  <div className="submit-btn">
                    <IonButton type="submit">Submit</IonButton>
                  </div>                  
                  <p>{message}</p>
                </form>
              </div>
            )}
          </div>) : (
          <div className="first-steps">
            <div className="account-form">
              <h2>Log In</h2>
              <div id="center"><hr /></div>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="submit-btn">
                  <IonButton type="submit">Submit</IonButton>
                </div>
                <p>{message}</p>
              </form>
              <p>Haven't made an account? Sign up <button>here</button></p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Onboarding
