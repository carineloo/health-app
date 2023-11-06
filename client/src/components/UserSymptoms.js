import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UserSymptoms = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [symptom, setSymptom] = useState(null)

    const userId = cookies.UserId

    const getSymptom = async () => {
        try {
            const response = await axios.get('http://localhost:8080/symptoms', {
                params: { userId }
            })
            setSymptom(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSymptom()
    }, [])

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