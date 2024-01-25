import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IonButton } from '@ionic/react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const EQ5D_Form = () => {

  const [cookies] = useCookies(['user'])
  const [slider, setSlider] = useState(50);
  const userId = cookies.UserId
  let navigate = useNavigate()
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

  // Handler function to update the slider value
  const handleSlider = (e, newValue) => {
    setSlider(newValue);
  };

  // filtering to check for array and mapping to get only the selected statement
  const filteredForm = Object.keys(formData).reduce((acc, key) => {
    acc[key] = Array.isArray(formData[key]) ? formData[key].filter(item => item.selected).map(item => item.statement) : formData[key];
    return acc;
  }, {});

  const handleSubmit = async (e) => {
    console.log('submitted')
    e.preventDefault()
    try {
      const response = await axios.post('//' + process.env.REACT_APP_API_HOST + '/eq5d', {
        userId,
        formData: filteredForm,
        slider
      })
      const success = response.status === 200
      if (success) navigate('/myaccount')
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (statement, section) => {
    // create a copy of the current formData
    const updatedFormData = { ...formData };
    // update the section with the selected (checked) statement
    updatedFormData[section] = updatedFormData[section].map(item => ({
      ...item, selected: item.statement === statement,
    }));
    setFormData(updatedFormData);
  };

  return (
    <div className="eq5d">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h4>Under each heading, please tick ONE box that best describes your health TODAY.</h4>
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

          <div className="slider">
            <h5>Lastly, please rate how you feel on the scale of 0 - 100.</h5>
            <Box sx={{ width: 600 }}>
              <Slider defaultValue={50}
                value={slider}
                onChange={handleSlider}
                aria-label="Scale"
                valueLabelDisplay="on"
              />
              {/* You can access the current value using `sliderValue` */}
              <p>Current Value: {slider}</p>
            </Box>
          </div>

          <div className="submit-btn">
            <IonButton type="submit">Submit</IonButton>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EQ5D_Form
