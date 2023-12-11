import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav'
import Chatbot from '../components/Chatbot';
import PostSymptoms from '../components/PostSymptoms.js';
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Baseline = (showBoarding) => {

    const [userResponses, setUserResponses] = useState([]);
    const [currentStep, setCurrentStep] = useState(0); // count symptoms step
    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId

    const getUser = async () => {
        try {
            const userResponse = await axios.get('//'+process.env.REACT_APP_API_HOST+'/user', {
                params: { userId }
            })
            setUser(userResponse.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, []) // anytime user changes, it will getUser()

    const handleUserResponse = (stepId, response) => {
        // update responses
        setUserResponses((prevResponse) => [
            ...prevResponse,
            { stepId, response },
        ])
        // update current step
        setCurrentStep((prevStep) => prevStep + 1);
    }

    useEffect(() => { // runs whenever userResponses is updated
        console.log(userResponses);
        if (userResponses.length === 0) { // Check if userResponses is empty
            setCurrentStep(0); // Reset the current step to 0
        }
    }, [userResponses]); // Add userResponses as a dependency

    return (
        <>
            <Nav showBoarding={showBoarding} />
            <div className='chatbot'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            {user && <div className='display-symptoms'>
                                <PostSymptoms user={user} userResponses={userResponses} currentStep={currentStep} />
                            </div>}
                        </div>
                        <div className='col'>
                            <Chatbot setUserResponses={setUserResponses} handleUserResponse={handleUserResponse} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Baseline
