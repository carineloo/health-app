import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PostSymptoms = ({ user, userResponses, currentStep }) => {

  const [showBtn, setShowBtn] = useState(false)
  const [startCron, setStartCron] = useState(false);

  const userId = user?.user_id
  const userEmail = user?.email
  let pageNavigate = useNavigate()

  const postSymptom = async () => {
    setShowBtn(true) // allow training btn

    try {
      await axios.post('//' + process.env.REACT_APP_API_HOST + '/symptom', { userId, symptom: userResponses });
    } catch (error) {
      console.error('Error sending symptoms to the backend:', error);
    }
  }

  const beginCron = async () => {
    try {
      await axios.post('//' + process.env.REACT_APP_API_HOST + '/start-cron', { userEmail });
      setStartCron(true);
    } catch (error) {
      console.error('Error starting cron timer:', error);
    }

    pageNavigate('/trainingvideos')
    window.location.reload()
  };

  // const toTraining = () => {
  //   pageNavigate('/trainingvideos')
  //   window.location.reload()
  // }

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

        {showBtn &&
          <button className="chatbot-btn1" onClick={beginCron}>Begin my 14-day journey</button>}
      </div>
    </div>
  );
}

export default PostSymptoms;
