import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserSymptoms = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [symptom, setSymptom] = useState(null)
  const [rose, setRose] = useState(null)

  const userId = cookies.UserId
  let navigate = useNavigate()

  const getSymptom = async () => {
    try {
      const response = await axios.get('//'+process.env.REACT_APP_API_HOST+'/symptoms', {
        params: { userId }
      })
      setSymptom(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getRoseQ = async () => {
    try {
      const response = await axios.get('//'+process.env.REACT_APP_API_HOST+'/rose', {
        params: { userId }
      })
      setRose(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSymptom()
    getRoseQ()
  }, [])

  useEffect(() => {
    if (rose && rose.length === 0 && symptom && symptom[0].symptoms[0].response.toLowerCase() === 'yes') {
      navigate('/roseQ')
    }

  }, [symptom, rose]);

  return (
    <div>
      {symptom ? (
        <div className='symptoms'>
          <ol>
            {symptom[0].symptoms.map((s, index) => (
              <li key={index}>
                <strong>{s.stepId}:</strong> {s.response}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p>No symptoms found for this user.</p>
      )}

    </div>
  )
}

export default UserSymptoms
