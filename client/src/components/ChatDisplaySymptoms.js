import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ChatDisplaySymptoms = ({ user, userResponses, currentStep }) => {

    const [showBtn, setShowBtn] = useState(false)

    const userId = user?.user_id
    let pageNavigate = useNavigate()

    const postSymptom = async () => {
        setShowBtn(true) // allow training btn
        const symptom = {
            symptoms: userResponses
        }
        console.log("userid:", userId, "symptoms:", symptom)

        try {
            await axios.post('//'+process.env.REACT_APP_API_HOST+'/symptom', { userId, symptom: userResponses });
        } catch (error) {
            console.error('Error sending symptoms to the backend:', error);
        }
    }

    const toTraining = () => {
        pageNavigate('/trainingvideos')
        window.location.reload()
    }

    return (
        <div className='symptoms'>
            <h4>Your symptoms ({currentStep}/<span id="total">15</span>):</h4>
            <ol>
                {userResponses.map((response, index) => (
                    <li key={index}>
                        <span id="symptom">{response.stepId}</span>: {response.response}
                    </li>
                ))}
            </ol>

            <div className="chatbot-btns" >
                {currentStep === 15 && <button className="chatbot-btn1" disabled={showBtn} onClick={postSymptom}>SAVE</button>}

                {showBtn && <button className="chatbot-btn1" onClick={toTraining}>Begin training</button>}
            </div>

        </div>
    );
}

export default ChatDisplaySymptoms;
