import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Onboarding from '../components/Onboarding'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import axios from 'axios'

const Home = () => {

  const [showBoarding, setShowBoarding] = useState(false)
  const [signUp, setSignUp] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [user, setUser] = useState(null)

  const authToken = cookies.AuthToken
  const userId = cookies.UserId
  let navigate = useNavigate()

  const getUser = async () => {
    try {
      const response = await axios.get('//' + process.env.REACT_APP_API_HOST + '/user', {
        params: { userId }
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  // to show onboarding
  const handleClick = () => {
    setShowBoarding(true)
    setSignUp(true) // signing up
  }

  const toTraining = () => {
    navigate('/trainingvideos')
  }

  return (
    <>
      <Nav
        authToken={authToken}
        setShowBoarding={setShowBoarding}
        showBoarding={showBoarding}
        setSignUp={setSignUp}
      />
      <div className="home">
        <div className="home-contents">
          <div className="row">
            <div className="home-top">
              <motion.div animate={{ opacity: 1 }} transition={{
                ease: "linear",
                duration: 1,
              }} initial={{ opacity: 0 }}>
                {!authToken ? <>
                  <h1>Hi there, welcome.</h1>
                  <h1>My name is Harper, let me show you around!</h1></> : <h2>Harper will always be here for you.</h2>}
              </motion.div>
            </div>

            <motion.div animate={{ opacity: 1 }} transition={{
              delay: 1.75, ease: "linear",
              duration: .5,
            }} initial={{ opacity: 0 }}>
              <IonGrid fixed={true}>
                <IonRow className='ion-no-padding'>
                  <IonCol size="12" sizeMd='3'>{authToken ? <div onClick={toTraining}>Take me to the training videos. </div> : <div onClick={handleClick}>Log in to view training videos. </div>}</IonCol>
                  <IonCol size="12" sizeMd='4' offset-md="1">Report symptoms</IonCol>
                  <IonCol size="12" sizeMd='3' offset-md="1">Feedback</IonCol>
                </IonRow>
              </IonGrid>
            </motion.div>
          </div>

          <div className="row row-button">
            <motion.div animate={{ opacity: 1 }} transition={{
              delay: 1, ease: "linear",
              duration: .5,
            }} initial={{ opacity: 0 }}>
              <div className="main">
                {user && authToken ? (
                  <div className="borders">
                    Hey {user.first_name}, you are logged in!
                  </div>
                ) : (
                  <button className="borders" onClick={handleClick}>
                    Click here to begin.
                  </button>
                )}
              </div>
              {showBoarding && <Onboarding setShowBoarding={setShowBoarding} signUp={signUp} setSignUp={setSignUp} />}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Home
