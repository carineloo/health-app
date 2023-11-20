import UserDetails from '../components/UserDetails'
import UserSymptoms from "../components/UserSymptoms"
import User_EQ5D from '../components/User_EQ5D'
import { useState } from 'react'
import { IonItem, IonLabel, IonList, IonButton } from '@ionic/react';
import PHQ4 from './PHQ4';

const UserProfile = ({ handleClick }) => {

  const [section, setDisplaySection] = useState("main");

  const handleSection = (section) => {
    setDisplaySection(section);
  };

  return (
    <>
      <h3>My Profile</h3>
      <div className="my-contents">
        <IonList inset={true} lines="full">
          <IonItem>
            <IonLabel onClick={() => handleSection("main")} className={section === "main" ? "active" : ""}
            >This page</IonLabel>
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
            <p>View your digital health on the left!</p>
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
            <h5>PHQ-4: The FOUR-ITEM patient health questionaire for anxiety and depression</h5>
            <PHQ4 />
          </section>}
        </div>
      </div>
    </>
  );
}

export default UserProfile