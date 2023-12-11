import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IonButton } from '@ionic/react';

const DisplayEQ5D = () => {

  const [cookies] = useCookies(['user'])
  const [eq5d, setEq5d] = useState(null)
  const [showFormButton, setShowFormButton] = useState(false)

  const userId = cookies.UserId
  let navigate = useNavigate()

  const toEQ5D = () => {
    navigate('/eq5d')
  }
  const toEQ5D_Data = () => {
    navigate('/eq5d_data')
  }

  const getEQ5D = async () => {
    try {
      const response = await axios.get('//'+process.env.REACT_APP_API_HOST+'/eq5d_db', {
        params: { userId }
      })

      const today = new Date()
      today.setHours(0, 0, 0, 0);
      // today.setSeconds(today.getSeconds() - 10);
      const filteredData = response.data.filter(eq5dRecord => {
        const recordDate = new Date(eq5dRecord.date); // filter EQ5D data for the current day
        return recordDate >= today;
      });

      // check if the user has completed the form today !!
      setShowFormButton(filteredData.length === 0);

      const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date))
      setEq5d(sortedData[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getEQ5D()
  }, [])

  return (
    <div className="user-eq5d">
      {eq5d ? (
        <>
          <ul>
            <li><strong>Mobility:</strong> {eq5d.eq5d.mobility}.</li>
            <li><strong>Self care:</strong> {eq5d.eq5d.selfCare}.</li>
            <li><strong>Usual activities:</strong> {eq5d.eq5d.activities}.</li>
            <li><strong>Pain/ discomfort:</strong> {eq5d.eq5d.discomfort}.</li>
            <li><strong>Anxiety/ depression:</strong> {eq5d.eq5d.anxiety}.</li>
          </ul>
          <div className="submit-btn">
            <IonButton onClick={toEQ5D_Data} style={{
              textTransform: 'capitalize'
            }}>View Previous Data</IonButton>
          </div>
        </>
      ) : showFormButton &&
      <IonButton onClick={toEQ5D}>Complete your EQ5D for today</IonButton>}
    </div>
  )
}

export default DisplayEQ5D
