import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EditEQ5DForm from './EditEQ5DForm';
import { IonButton } from '@ionic/react';

const DisplayEQ5DResponses = ({ eq5dResponses }) => {

  const [dateSelected, setDateSelected] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null); // Selected response for editing

  let navigate = useNavigate()

  // get dates with responses for calendar
  const filterDate = (date) => {
    const yes = eq5dResponses.some(response => new Date(response.date).toDateString() === date.toDateString());
    return yes; // returns true to allow dates
  };

  // filter to only show the response for the selected date
  const filterResponses = dateSelected &&
    eq5dResponses.filter((response) => new Date(response.date).toDateString() === dateSelected.toDateString()
    )

  const myaccount = () => {
    navigate('/myaccount')
  }

  const handleEdit = (response) => {
    setSelectedResponse(response);
    setDateSelected(new Date(response.date)); // Set the selected date
  };

  return (
    <div className="eq5dResponses">
      <div className="selectors">
        <div className="submit-btn" id="back-btn">
          <IonButton onClick={myaccount} style={{ textTransform: 'capitalize' }}>Back to my accounts</IonButton>
        </div>
        <h4>Previous Responses</h4>
      </div>

      <DatePicker
        selected={dateSelected}
        onChange={(date) => setDateSelected(date)}
        inline
        filterDate={filterDate}
      />

      {dateSelected && filterResponses.map((response, index) => (
        <div key={index}>
          <strong>Date:</strong> {new Date(response.date).toLocaleDateString('en-UK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })} <br />
          <ul>
            <li><strong>Mobility:</strong> {response.eq5d.mobility} </li>
            <li><strong>Self care:</strong> {response.eq5d.selfCare}</li>
            <li><strong>Usual activities:</strong> {response.eq5d.activities}</li>
            <li><strong>Pain/ discomfort:</strong> {response.eq5d.discomfort}</li>
            <li><strong>Anxiety/ depression:</strong> {response.eq5d.anxiety}</li>
          </ul>
          <div className="submit-btn" id="edit-btn">
            <IonButton onClick={() => handleEdit(response)} style={{ textTransform: 'capitalize' }}>Edit my response</IonButton>
          </div>
          {selectedResponse && <EditEQ5DForm selectedResponse={selectedResponse} dateSelected={dateSelected} />}
        </div>
      ))}
    </div>
  )
}
export default DisplayEQ5DResponses