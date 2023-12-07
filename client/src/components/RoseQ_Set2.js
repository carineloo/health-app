import React, { useState, useEffect } from 'react';

const RoseQ_Set2 = ({ partB, setPartB }) => {

  // create a copy to dynamically update the state value with name as the key
  const handlePartBChange = (name, value) => {
    setPartB({ ...partB, [name]: value });
  };

  return (
    <ol>
      <div className="rose-question">
        <label>
          <li>Within the last 1 year, have you ever had any pain or discomfort in your chest?</li>
        </label>
        <select value={partB.question1} onChange={(e) => handlePartBChange('question1', e.target.value)}>
          <option value="" disabled>Select</option>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
      {partB.question1 === 'false' && (
        <div className="rose-question">
          <label>
            a. Within the last 1 year, have you ever had any pressure or heaviness in your chest?
          </label>
          <select value={partB.question1a} onChange={(e) => handlePartBChange('question1a', e.target.value)}>
            <option value="" disabled>Select</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      )}

      <div className="rose-question">
        <label>
          <li> Did the pain/discomfort/pressure/heaviness in the chest occur for the first time in the last year?</li>
        </label>
        <select value={partB.question2} onChange={(e) => handlePartBChange('question2', e.target.value)}>
          <option value="" disabled>Select</option>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>

      <div className="rose-question">
        <label>
          <li>Did you get it when you walked uphill or hurry?</li>
        </label>
        <select value={partB.question3} onChange={(e) => handlePartBChange('question3', e.target.value)}>
          <option value="" disabled>Select</option>
          <option value="false">No</option>
          <option value="true">Yes</option>
          <option value="never">Never hurries nor walks uphill</option>
        </select>
      </div>

      <div className="rose-question">
        <label>
          <li>Did you get it when you walked at an ordinary pace on the level?</li>
        </label>
        <select value={partB.question4} onChange={(e) => handlePartBChange('question4', e.target.value)}>
          <option value="" disabled>Select</option>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>

      {(partB.question3 === 'true' || partB.question4 === 'true') && (<>
        <div className="rose-question">
          <label>
            <li>What did you do if you get it while you were walking?</li>
          </label>
          <select value={partB.question5} onChange={(e) => handlePartBChange('question5', e.target.value)}>
            <option value="" disabled>Select</option>
            <option value="stop">Stops or slow down</option>
            <option value="carryOn">Carry on</option>
          </select>
        </div>

        <div className="rose-question">
          <label>
            <li>If you would stand still, what happened to it?</li>
          </label>
          <select value={partB.question6} onChange={(e) => handlePartBChange('question6', e.target.value)}>
            <option value="" disabled>Select</option>
            <option value="relieved">Relieved</option>
            <option value="notRelieved">Not relieved</option>
          </select>
        </div>

        <div className="rose-question">
          <label >
            <li>How soon? 10 min or less/More than 10 min</li>
          </label>
          <select value={partB.question7} onChange={(e) => handlePartBChange('question7', e.target.value)}>
            <option value="" disabled>Select</option>
            <option>10 min or less</option>
            <option>More than 10 min</option>
          </select>
        </div></>
      )}
    </ol>
  )
}

export default RoseQ_Set2;