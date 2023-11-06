import React, { useState } from 'react';
import Nav from '../components/Nav'

const Baseline = () => {
    let nextId = 0
    const questions = [
        {
            id: nextId++,
            questionText: 'Chest discomfort/pain',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Nausea',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Breathlessness',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Anxiety',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Awareness of an abnormal heart rhythm',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Tiredness/Fatigue',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Dizziness',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Sweating',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Low Mood',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Headache',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Muscle Pain',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Difficulty with speech',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Jaw pain',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
        {
            id: nextId++,
            questionText: 'Indigestion',
            answerOptions: [
                { answerText: 'Yes', isTrue: true },
                { answerText: 'No', isTrue: false },
            ],
        },
    ];

    const [currentQ, setCurrentQ] = useState(0);
    const [showTrue, setShowTrue] = useState(false);
    const [showFalse, setShowFalse] = useState(false);
    const [scoreTrue, setScoreTrue] = useState(0);
    const [scoreFalse, setScoreFalse] = useState(0);

    const [trueOutput, setTrueOutput] = useState([]);
    const [falseOutput, setFalseOutput] = useState([]);

    const handleAnswer = (isTrue) => {
        if (isTrue) {
            setScoreTrue(scoreTrue + 1);
            const newTrue = (
                <div className='outputQ' key={questions[currentQ].id}>
                    <h3>{questions[currentQ].questionText}</h3>
                </div>
            )
            setTrueOutput(prev => [...prev, newTrue]);
        } else {
            setScoreFalse(scoreFalse + 1);
            const newFalse = (
                <div className='outputQ' key={questions[currentQ].id}>
                    <h3>{questions[currentQ].questionText}</h3>
                </div>
            )
            setFalseOutput(prev => [...prev, newFalse]);
        }

        const nextQ = currentQ + 1;
        if (nextQ < questions.length) {
            setCurrentQ(nextQ);
        } else {
            setShowTrue(true);
        }
    };

    const renderTrue = trueOutput.map((content, index) => (
        <div key={index}>
            {content}
        </div>
    ));
    const renderFalse = falseOutput.map((content, index) => (
        <div key={index}>
            {content}
        </div>
    ));

    return (
        <>
            <Nav></Nav>
            <div className='begin-baseline'>
                First, I would like to understand your health issues. Have you had any of the following in the last month?
            </div>
            <div className='baseline'>
                {showTrue ? (
                    <div className='output'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6'>
                                    You said YES to {scoreTrue} questions:
                                </div>
                                <div className='col'>
                                    {renderTrue}
                                </div>
                                <hr></hr>
                                <div className='col-6'>
                                    and NO to {scoreFalse} questions:
                                </div>
                                <div className='col'>
                                    {renderFalse}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* <div className='begin-baseline'>
                            I would like to understand your health issues. Please click next to proceed.
                        </div> */}
                        <div className='display-question'>
                            <div className='counter'>
                                <span>Symptom {currentQ + 1}</span>/{questions.length}:

                            </div>
                            <div className='questions'>{questions[currentQ].questionText}</div>
                        </div><div className='answers'>
                            {questions[currentQ].answerOptions.map((answerOption) => (
                                <button onClick={() => handleAnswer(answerOption.isTrue)}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
export default Baseline