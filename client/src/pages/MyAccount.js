import Nav from '../components/Nav'
import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AccountForm from '../components/AccountForm'
import UserProfile from '../components/UserProfile'
import EditAccForm from '../components/EditAccForm'


const MyAccount = () => {

    const [user, setUser] = useState(null)
    const [cookies] = useCookies(['user'])
    const [showContent, setShowContent] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const authToken = cookies.AuthToken
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
        // show loading to wait for components 
        const delay = 500;
        const timer = setTimeout(() => {
            setShowContent(true);
        }, delay);
        // clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [])

    // to show edit components
    const handleClick = () => {
        setShowEdit(true)
        setShowContent(false);
    }

    // loading
    const loadMessage = () => {
        return <p id="load">Loading... Please wait.</p>;
    }

    return (<>
        <Nav authToken={authToken} />
        <div className="myaccount">
            {user && user.first_name ? (
                <>
                    {showContent ? (
                        <UserProfile handleClick={handleClick} />
                    ) : (
                        showEdit ?
                            <EditAccForm user={user} />
                            : (loadMessage())
                    )}
                </>
            ) : (
                // first time signing up
                user === null ? loadMessage() : <AccountForm />
            )}
        </div>
    </>)
}
export default MyAccount
