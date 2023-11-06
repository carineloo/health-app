import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Edit_EQ5D_Form from './Edit_EQ5D_Form';

const UserResponses_EQ5D = ({ eq5dResponses }) => {

    const [dateSelected, setDateSelected] = useState(null);
    const [show, setShow] = useState(false);
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

    const displayCalendar = () => {
        setShow(true)
    }

    const handleEdit = (response) => {
        setSelectedResponse(response);
        setDateSelected(new Date(response.date)); // Set the selected date
    };

    return (
        <div className="eq5dResponses">
            <div className="selectors">
                <button id="back-btn" onClick={myaccount}>Back to my accounts</button>
                <h4>Previous Responses <button id="select-btn" onClick={displayCalendar}>Select dates:</button></h4>
            </div>

            {show &&
                <DatePicker
                    selected={dateSelected}
                    onChange={(date) => setDateSelected(date)}
                    inline
                    filterDate={filterDate} s
                />}

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
                    <button id="edit-btn" onClick={() => handleEdit(response)}>Edit my response</button>

                    {selectedResponse && <Edit_EQ5D_Form selectedResponse={selectedResponse} dateSelected={dateSelected} />}
                </div>
            ))}
        </div>
    )
}
export default UserResponses_EQ5D