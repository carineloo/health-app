import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Onboarding from '../components/Onboarding'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
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
            const response = await axios.get('http://localhost:8080/user', {
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
                                    <h2>Hi there, welcome.</h2>
                                    <h2>Let me teach you about FAITH. But first, let's get to know you.</h2></> : <h2>FAITH will always be here for you.</h2>}
                            </motion.div>
                        </div>
                    </div>

                    <div className="row row-button">
                        <motion.div animate={{ opacity: 1 }} transition={{
                            delay: 1, ease: "linear",
                            duration: .5,
                        }} initial={{ opacity: 0 }}>
                            {user && authToken ? <em id="main2">Hey {user.first_name}, you are logged in!</em> : <button id="main" onClick={handleClick}>CLICK HERE TO BEGIN.</button>}
                            {/* when clicked, showBoarding is true, so this appears */}
                            {showBoarding && <Onboarding setShowBoarding={setShowBoarding} signUp={signUp} />}
                        </motion.div>
                    </div>

                    <div className="row">
                        <div className="container">
                            <motion.div animate={{ opacity: 1 }} transition={{
                                delay: 1.75, ease: "linear",
                                duration: .5,
                            }} initial={{ opacity: 0 }}>
                                <div className="row tabs-row">
                                    <div className="col">
                                        {authToken ? <button onClick={toTraining}>Take me to the training videos. </button> : <button onClick={handleClick}>Sign up or log in to see the training videos. </button>}
                                    </div>
                                    <div className="col">
                                        <button href="">I’m experiencing symptoms. <br/> (enter symptoms)</button>
                                    </div>
                                    <div className="col">
                                        <button href="">How can I be more helpful?</button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
export default Home