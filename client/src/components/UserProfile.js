import UserDetails from '../components/UserDetails'
import UserSymptoms from "../components/UserSymptoms"
import User_EQ5D from '../components/User_EQ5D'

const UserProfile = ({ handleClick }) => {
    return (
        <>
            <h3>My Profile</h3>
            <div className="my-contents">
                <div className="container profile">
                    <div className="row">
                        <section className="col-6 details">
                            <h5>Your details</h5>
                            <UserDetails />
                            <div id="edit-button">
                                <button onClick={handleClick}>Edit</button>
                            </div>
                        </section>
                        <section className="col">
                            <h5>Your current symptoms</h5>
                            <UserSymptoms />
                        </section>
                    </div>
                    <div className="row">
                        <section className="col">
                            <h5>Your EQ5D today</h5>
                            <User_EQ5D />
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile