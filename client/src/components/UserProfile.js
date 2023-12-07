import UserDetails from '../components/UserDetails'
import UserSymptoms from "../components/UserSymptoms"
import User_EQ5D from '../components/User_EQ5D'
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
      const response = await axios.get('http://localhost:8080/user', {
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
            >Welcome, {user.first_name}</IonLabel>}
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
          {/* {section === null && section === "main"} */}
          {section === "main" && <section className="col">
            <h5>Accounts page</h5>
            {user && <p>Hi, {user.first_name}. You can view your access you digital health on the left!</p>}
          </section>}
          {section === "details" && <section className="col">
            <h5>Your details</h5>
            <UserDetails />
            <div className="submit-btn">
              <IonButton onClick={handleClick}>Edit</IonButton>
            </div>
          </section>}
          {section === "symptoms" && <section className="col">
            <h5>Your current symptoms</h5>
            <UserSymptoms />
          </section>}
          {section === "eq5d" && <section className="col">
            <h5>Your EQ5D today</h5>
            <User_EQ5D />
          </section>}
          {section === "phq4" && <section className="col">
            <h5>PHQ-4: The FOUR-ITEM patient health questionaire</h5>
            <PHQ4 />
          </section>}
        </div>
      </div>
    </>
  );
}

export default UserProfile