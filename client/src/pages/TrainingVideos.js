import Nav from '../components/Nav'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const TrainingVideos = () => {

  const [current, setCurrent] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken
  let pageNavigate = useNavigate()
  let nextId = 0

  const instructions = [
    {
      id: nextId++,
      questionText: 'First, please put on the watch.',
      answerOptions: [
        { answerText: 'Next', isTrue: true },
      ],
    }, {
      id: nextId++,
      questionText: 'Are you wearing it on the right or left wrist?',
      answerOptions: [
        { answerText: 'Left', isTrue: false },
        { answerText: 'Right', isTrue: true },
      ],
    }, {
      id: nextId++,
      questionText: 'Please wear the watch as much as possible. It tells me about your activity and heart rate.',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Next', isTrue: true },
      ],
    }, {
      id: nextId++,
      questionText: 'I will sometimes ask you to record your blood pressure.',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Next', isTrue: true },
      ],
    }, {
      id: nextId++,
      questionText: 'This video shows you how. Let’s practice.',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Next', isTrue: true },
      ],
    }, {
      id: nextId++,
      questionText: 'Please record your blood pressure in the way the video showed.',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Next', isTrue: true },
      ],
    }, {
      id: nextId++,
      questionText: 'Please walk around. You should see the steps and heart rate change on your watch.',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Next', isTrue: true },
      ],
    }, {
      id: nextId++,
      questionText: 'I will sometimes ask you to record ECG.',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Next', isTrue: true },
      ],
    }, {
      id: nextId++,
      questionText: 'This video shows you how.',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Next', isTrue: true },
      ],
    }, {
      id: nextId++,
      questionText: 'Let’s practice.',
      answerOptions: [
        { answerText: 'Back', isTrue: false },
        { answerText: 'Next', isTrue: true },
      ],
    }, {
      id: nextId++,
      questionText: 'How confident do you feel using me?',
      answerOptions: [
        { answerText: '1', isTrue: true },
        { answerText: '2', isTrue: true },
        { answerText: '3', isTrue: true },
        { answerText: '4', isTrue: true },
        { answerText: '5', isTrue: true },
      ],
    }, {
      id: nextId++,
      questionText: 'Thank you.',
      answerOptions: [
        { answerText: 'Finish', isTrue: true },
      ],
    },
  ];

  const handleAnswer = (isTrue) => {
    if (isTrue) {
      // moving to the next item
      const next = current + 1;
      if (next < instructions.length) {
        setCurrent(next);
      } else if (instructions.length) {
        // if reach end of length, navigate to home
        pageNavigate('/myaccount')
      }
    } else {
      // Move backward when "Back" is clicked
      const prev = current - 1;
      if (prev >= 0) {
        setCurrent(prev);
      }
    }
  };

  return (
    <>
      <Nav authToken={authToken} />
      <div className='onboarding'>
        <div className='onboarding-content'>
          <div className="border">
            <div className='instruction'>
              <h3>{instructions[current].questionText}</h3>
            </div>
            <div className='response-section'>
              <div className='response'>
                {instructions[current].answerOptions.map((answerOption, index) => (
                  <button key={index} onClick={() => handleAnswer(answerOption.isTrue)}>
                    {answerOption.answerText}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default TrainingVideos