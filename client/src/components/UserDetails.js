import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UserDetails = () => {

    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId

    const getUser = async () => {
        try {
            const response = await axios.get('//'+process.env.REACT_APP_API_HOST+'/user', {
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

    return (<>
        {user &&
            <div className="container columns">
                <div className="row">
                    <div className="bits col-2">
                        <p>Name:</p>
                        <p>Date of Birth:</p>
                        <p>Email:</p>
                        <p>Mobile Number:</p>
                    </div>
                    <div className="bits col-3" id="texts">
                        <p>{user.first_name} {user.last_name}</p>
                        <p>{user.d_day_dob}/{user.d_month_dob}/{user.d_year_dob}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                    </div>
                    <div className="bits col-2">
                        <p>Address:</p>
                    </div>
                    <div className="bits col" id="texts">
                        <p>{user.address_no}<br />{user.address_street}<br />{user.address_city}<br />{user.address_post}<br /> {user.address_country}</p>
                    </div>
                </div>
            </div>
        }</>
    )
}
export default UserDetails
