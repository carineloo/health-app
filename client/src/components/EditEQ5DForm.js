import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { IonButton } from '@ionic/react';

const EditEQ5DForm = ({ selectedResponse, dateSelected }) => {

  const [cookies] = useCookies(['user'])
  const [formData, setFormData] = useState({
    mobility: [
      { statement: "I have no problems in walking about", selected: false },
      { statement: "I have slight problems in walking about", selected: false },
      { statement: "I have moderate problems in walking about", selected: false },
      { statement: "I have severe problems in walking about", selected: false },
      { statement: "I am unable to walk about", selected: false },
    ],
    selfCare: [
      { statement: "I have no problems washing or dressing myself", selected: false },
      { statement: "I have slight problems washing or dressing myself", selected: false },
      { statement: "I have moderate problems washing or dressing myself", selected: false },
      { statement: "I have severe problems washing or dressing myself", selected: false },
      { statement: "I am unable to wash or dress myself", selected: false },
    ],
    activities: [
      { statement: "I have no problems doing my usual activities", selected: false },
      { statement: "I have slight problems doing my usual activities", selected: false },
      { statement: "I have moderate problems doing my usual activities", selected: false },
      { statement: "I have severe problems doing my usual activities", selected: false },
      { statement: "I am unable to do my usual activities", selected: false },
    ],
    discomfort: [
      { statement: "I have no pain or discomfort", selected: false },
      { statement: "I have slight pain or discomfort", selected: false },
      { statement: "I have moderate pain or discomfort", selected: false },
      { statement: "I have severe pain or discomfort", selected: false },
      { statement: "I have extreme pain or discomfort", selected: false },
    ],
    anxiety: [
      { statement: "I am not anxious or depressed", selected: false },
      { statement: "I am slightly anxious or depressed", selected: false },
      { statement: "I am moderately anxious or depressed", selected: false },
      { statement: "I am severely anxious or depressed", selected: false },
      { statement: "I am extremely anxious or depressed", selected: false },
    ],
  });

  const userId = cookies.UserId

  // prepopulate the initial responses
  useEffect(() => {
    if (selectedResponse) {
      const updatedFormData = { ...formData } // copy object state

      for (const key in selectedResponse.eq5d) {
        if (updatedFormData[key]) {
          updatedFormData[key] = updatedFormData[key].map(item => ({
            ...item,
            selected: selectedResponse.eq5d[key].includes(item.statement),
          }));
        }
      }

      setFormData(updatedFormData);
    }
  }, [selectedResponse]);

  const handleSubmit = async (e) => {
    console.log('submitted')
    e.preventDefault()
    try {
      const response = await axios.put('//'+process.env.REACT_APP_API_HOST+'/eq5d_db', {
        userId,
        formData,
        date: dateSelected,
      })
      const success = response.status === 200
      if (success) window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (statement, section) => {
    const updatedFormData = { ...formData };

    updatedFormData[section] = updatedFormData[section].map(item => ({
      ...item, selected: item.statement === statement,
    }));
    setFormData(updatedFormData);
  };

  return (
    <div className="eq5d">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h4>Please make any changes to the following.</h4>
          <div className="row boxes">
            <div className="sections mobility">
              <h5>MOBILTY</h5>
              {formData.mobility.map((item, index) => (
                <div key={index} className="descriptions">
                  <label htmlFor={`statement_mobility_${index}`}>{item.statement}</label>
                  <input
                    id={`statement_mobility_${index}`}
                    type="checkbox"
                    onChange={() => handleChange(item.statement, 'mobility')}
                    checked={item.selected}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="row boxes">
            <div className="sections self-care">
              <h5>SELF-CARE</h5>
              {formData.selfCare.map((item, index) => (
                <div key={index} className="descriptions">
                  <label htmlFor={`statement_self-care_${index}`}>{item.statement}</label>
                  <input
                    id={`statement_self-care_${index}`}
                    type="checkbox"
                    onChange={() => handleChange(item.statement, 'selfCare')}
                    checked={item.selected}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="row boxes">
            <div className="sections activities">
              <h5>USUAL ACTIVITIES <i>(e.g. work, study, housework, family or leisure activities)</i></h5>
              {formData.activities.map((item, index) => (
                <div key={index} className="descriptions">
                  <label htmlFor={`statement_activities_${index}`}>{item.statement}</label>
                  <input
                    id={`statement_activities_${index}`}
                    type="checkbox"
                    onChange={() => handleChange(item.statement, 'activities')}
                    checked={item.selected}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="row boxes">
            <div className="sections discomfort">
              <h5>PAIN/ DISCOMFORT</h5>
              {formData.discomfort.map((item, index) => (
                <div key={index} className="descriptions">
                  <label htmlFor={`statement_discomfort_${index}`}>{item.statement}</label>
                  <input
                    id={`statement_discomfort_${index}`}
                    type="checkbox"
                    onChange={() => handleChange(item.statement, 'discomfort')}
                    checked={item.selected}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="row boxes">
            <div className="sections anxiety">
              <h5>ANXIETY/ DEPRESSION</h5>
              {formData.anxiety.map((item, index) => (
                <div key={index} className="descriptions">
                  <label htmlFor={`statement_anxiety_${index}`}>{item.statement}</label>
                  <input
                    id={`statement_anxiety_${index}`}
                    type="checkbox"
                    onChange={() => handleChange(item.statement, 'anxiety')}
                    checked={item.selected}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="submit-btn">
            <IonButton type="submit">Update</IonButton>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditEQ5DForm
