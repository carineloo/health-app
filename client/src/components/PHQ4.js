import React, { useState } from 'react';
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { IonButton } from '@ionic/react';

const PHQ4 = () => {

  const [cookies] = useCookies(['user'])

  const [survey, setSurvey] = useState([
    { id: 1, statement: 'Feeling nervous, anxious or on edge', rating: null },
    { id: 2, statement: 'Not being able to stop or control worrying', rating: null },
    { id: 3, statement: 'Feeling down, depressed or hopeless', rating: null },
    { id: 4, statement: 'Little interest or pleasure in doing things', rating: null },
  ]);

  const userId = cookies.UserId

  const handleChange = (id, value) => {
    const updatedData = survey.map((item) =>
      item.id === id ? { ...item, rating: value } : item
    );
    setSurvey(updatedData);
    console.log(survey)
  };

  const getColumnTotal = (column) => {
    const total = survey
      .filter((item) => item.rating !== null && item.rating === column)
      .reduce((acc, item) => acc + (item.rating || 0), 0);
    // item.rating || 0: if not null, it adds 0 to the accumulator
    // the 0 at the end ensures the acc starts from 0
    return total !== null && total !== '' ? total : '';
  };

  const getGrandTotal = () => {
    const grandTotal = survey
      .filter((item) => item.rating !== null) // filter to get non null ratings first
      .reduce((acc, item) => acc + (item.rating || 0), 0);

    return grandTotal !== null && grandTotal !== '' ? grandTotal : '';
  };

  const selected = survey.some((item) => item.rating !== null);
  // boolean that checks if at least one rating is selected, if not remain empty

  const postPHQ4 = async (e) => {
    e.preventDefault()
    try {
      // extract statement: rating pairs
      const itemsRated = survey.map(({ statement, rating }) => ({ statement, rating }));
      // Send the data to the backend
      await axios.post('http://localhost:8080/phq4', { userId, itemsRated, totalScore: getGrandTotal() });
      console.log('PHQ4 data sent successfully');
      console.log(itemsRated)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='phq4'>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Over the last two weeks, how often have you been
              bothered by the following problems?</th>
            <th>Not at all</th>
            <th>Several days</th>
            <th>More than half the days</th>
            <th>Nearly every day</th>
          </tr>
        </thead>
        <tbody>
          {survey.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.statement}</td>
              {[0, 1, 2, 3].map((rating) => (
                <td key={rating}>
                  <button
                    onClick={() => handleChange(item.id, rating)}
                    style={{
                      backgroundColor: item.rating === rating ? '#c5d8d1' : '#fcf4f4',
                    }}> {rating}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Totals:</td>
            {[0, 1, 2, 3].map((rating) => (
              <td key={rating}>
                {selected ? getColumnTotal(rating) : ''}
              </td>
            ))}
          </tr>
          <tr>
            <td colSpan={2}>Total Score:</td>
            <td colSpan={4}>
              {selected ? getGrandTotal() : ''}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="submit-btn">
        <IonButton type="submit" onClick={postPHQ4} disabled={!selected}>Submit</IonButton>
      </div>
    </div>
  );
};


export default PHQ4;