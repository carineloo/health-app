import React, { useState } from 'react';
import axios from 'axios'

const PHQ4_db = () => {

  const postPHQ4 = async () => {
    try {
      await axios.post('//'+process.env.REACT_APP_API_HOST+'/phq4', { userId, survey });
    } catch (error) {
      console.error('Error sending symptoms to the backend:', error);
    }
  }


}

export default PHQ4_db
