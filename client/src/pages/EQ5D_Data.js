import Nav from '../components/Nav'
import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayEQ5DResponses from '../components/DisplayEQ5DResponses'

// page to view previos eq5d forms according to date

const EQ5D_Data = () => {

    const [cookies] = useCookies(['user'])
    const [eq5dResponses, setEq5dResponses] = useState([])

    const userId = cookies.UserId
    const authToken = cookies.AuthToken

    const getEQ5D = async () => {
        try {
            const response = await axios.get('//'+process.env.REACT_APP_API_HOST+'/eq5d_db', {
                params: { userId }
            })
            setEq5dResponses(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEQ5D()
    }, [])

    return (<>
        <Nav authToken={authToken} />
        <DisplayEQ5DResponses eq5dResponses={eq5dResponses}/>
    </>)
}
export default EQ5D_Data
