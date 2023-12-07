import React from 'react';

const RoseQ_Set1 = ({partA, setPartA}) => {

  return (
    <ol>
      <div className="rose-question">
        <label>
          <li>Within the last 1 year, have you ever had a severe pain across the front of your chest lasting for half an hour or more?</li>
        </label>
        <select value={partA.question1} onChange={(e) => setPartA({ ...partA, question1: e.target.value })}>
          <option value="" disabled>Select</option>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
      <div className="rose-question">
        <label>
          <li>Did the pain occur for the first time in the last year?</li>
        </label>
        <select value={partA.question2} onChange={(e) => setPartA({ ...partA, question2: e.target.value })}>
          <option value="" disabled>Select</option>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
    </ol>
  );
}

export default RoseQ_Set1;