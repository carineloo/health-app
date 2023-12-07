import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { IonButton } from '@ionic/react';
import { useCookies } from 'react-cookie'
import axios from 'axios'
import RoseQ_Set1 from '../components/RoseQ_Set1';
import RoseQ_Set2 from '../components/RoseQ_Set2';

const RoseQ = () => {
  const [partA, setPartA] = useState({
    question1: '',
    question2: '',
  });

  const [partB, setPartB] = useState({
    question1: '',
    question1a: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
  });

  const [message, setMessage] = useState(null)
  const [cookies] = useCookies(['user'])
  const userId = cookies.UserId
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post('http://localhost:8080/rose', { userId, partA, partB });
      console.log("submitted")
      const success = response.status === 200
      if (success) navigate('/myaccount')
    } catch (error) {
      console.error('Error:', error)
      setMessage(error.response.data)
    }
  };

  return (
    <div className="roseQ">
      <div className="rose-container">
        <h3>Part A:</h3>
        <RoseQ_Set1 partA={partA} setPartA={setPartA} /> <br />

        <h3>Part B:</h3>
        <RoseQ_Set2 partB={partB} setPartB={setPartB} />
      </div>

      <div className="submit-btn">
        <IonButton type="submit" onClick={handleSubmit}>Submit</IonButton>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default RoseQ