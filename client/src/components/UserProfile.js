import DisplayUserDetails from '../components/DisplayUserDetails'
import DisplaySymptoms from "../components/DisplaySymptoms"
import DisplayEQ5D from '../components/DisplayEQ5D'
import React, { useState, useEffect } from 'react';
import { IonItem, IonLabel, IonList, IonButton } from '@ionic/react';
import { useCookies } from 'react-cookie'
import axios from 'axios'
import PHQ4 from './PHQ4';

const UserProfile = ({ handleClick }) => {

  const [section, setDisplaySection] = useState("main")
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [user, setUser] = useState(null)

  const userId = cookies.UserId

  const getUser = async () => {
    try {
      const response = await axios.get('//' + process.env.REACT_APP_API_HOST + '/user', {
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

  const handleSection = (section) => {
    setDisplaySection(section);
  };

  return (
    <>
      <h3>My Profile</h3>
      <div className="my-contents">
        <IonList inset={true} lines="full">
          <IonItem>
            {user && <IonLabel onClick={() => handleSection("main")} className={section === "main" ? "active" : ""}
            ><strong>Welcome, {user.first_name}</strong></IonLabel>}
          </IonItem>
          <IonItem>
            <IonLabel onClick={() => handleSection("details")} className={section === "details" ? "active" : ""}
            >Your details</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel onClick={() => handleSection("symptoms")} className={section === "symptoms" ? "active" : ""}>Current symptoms</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel onClick={() => handleSection("eq5d")} className={section === "eq5d" ? "active" : ""}>EQ5D today</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel onClick={() => handleSection("phq4")} className={section === "phq4" ? "active" : ""}>Mental Health</IonLabel>
          </IonItem>
        </IonList>

        <div className="container">
          {section === "main" && <section className="col">
            <h5>Accounts page</h5>
            {user && <p>Hi, {user.first_name}. You can view your access you digital health on the left!</p>}
            {/* {roseCheck && (
              <p>Since you mentioned you have chest pains, you will need to complete a questionnaire. Please click on current symptoms.</p>
            )} */}
          </section>}
          {section === "details" && <section className="col">
            <h5>Your details</h5>
            <DisplayUserDetails />
            <div className="submit-btn">
              <IonButton onClick={handleClick}>Edit</IonButton>
            </div>
          </section>}
          {section === "symptoms" && <section className="col">
            <h5>Your current symptoms</h5>
            <DisplaySymptoms />
          </section>}
          {section === "eq5d" && <section className="col">
            <h5>Your EQ5D today</h5>
            <DisplayEQ5D />
          </section>}
          {section === "phq4" && <section className="col">
            <h5>PHQ-4: The FOUR-ITEM health questionaire</h5>
            <PHQ4 />
          </section>}
        </div>
      </div>
    </>
  );
}

export default UserProfile