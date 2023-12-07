import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components'
import botAvatarImage from '../images/bot.png'; // Import the image

const Chatbot = ({ handleUserResponse, setUserResponses }) => {

    const steps = [
        {
            id: 'instruction',
            message: 'Please select YES or NO to the following symptoms. Your response will be shown on the screen, and you may edit them in the end.',
            trigger: 'okay',
        }, {
            id: 'okay',
            message: 'Okay, let us begin.',
            trigger: 'begin',
        }, {
            id: 'begin',
            message: 'Have you had any of the following in the last month?',
            trigger: 'chestDiscomfort',
        }, {
            id: 'chestDiscomfort',
            message: 'Chest discomfort/pain',
            trigger: 'chestDiscomfort_Opt',
        }, {
            id: 'chestDiscomfort_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Chest discomfort/pain', 'Yes');
                        return 'nausea';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Chest discomfort/pain', 'No');
                        return 'nausea';
                    },
                },
            ],
        }, {
            id: 'nausea',
            message: 'Nausea',
            trigger: 'nausea_Opt',
        }, {
            id: 'nausea_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Nausea', 'Yes');
                        return 'breathlessness';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Nausea', 'No');
                        return 'breathlessness';
                    },
                },
            ],
        }, {
            id: 'breathlessness',
            message: 'Breathlessness',
            trigger: 'breathlessness_Opt',
        }, {
            id: 'breathlessness_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Breathlessness', 'Yes');
                        return 'anxiety';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Breathlessness', 'No');
                        return 'anxiety';
                    },
                },
            ],
        }, {
            id: 'anxiety',
            message: 'Anxiety',
            trigger: 'anxiety_Opt',
        }, {
            id: 'anxiety_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Anxiety', 'Yes');
                        return 'abnormalHeart';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Anxiety', 'No');
                        return 'abnormalHeart';
                    },
                },
            ]
        }, {
            id: 'abnormalHeart',
            message: 'Awareness of an abnormal heart rhythm',
            trigger: 'abnormalHeart_Opt',
        }, {
            id: 'abnormalHeart_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Awareness of an abnormal heart rhythm', 'Yes');
                        return 'tiredness';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Awareness of an abnormal heart rhythm', 'No');
                        return 'tiredness';
                    },
                },
            ]
        }, {
            id: 'tiredness',
            message: 'Tiredness/Fatigue',
            trigger: 'tiredness_Opt',
        }, {
            id: 'tiredness_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Tiredness/Fatigue', 'Yes');
                        return 'dizziness';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Tiredness/Fatigue', 'No');
                        return 'dizziness';
                    },
                },
            ]
        }, {
            id: 'dizziness',
            message: 'Dizziness',
            trigger: 'dizziness_Opt',
        }, {
            id: 'dizziness_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Dizziness', 'Yes');
                        return 'sweating';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Dizziness', 'No');
                        return 'sweating';
                    },
                },
            ]
        }, {
            id: 'sweating',
            message: 'Sweating',
            trigger: 'sweating_Opt',
        }, {
            id: 'sweating_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Sweating', 'Yes');
                        return 'lowMood';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Sweating', 'No');
                        return 'lowMood';
                    },
                },
            ]
        }, {
            id: 'lowMood',
            message: 'Low Mood',
            trigger: 'lowMood_Opt',
        }, {
            id: 'lowMood_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Low Mood', 'Yes');
                        return 'headache';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Low Mood', 'No');
                        return 'headache';
                    },
                },
            ]
        }, {
            id: 'headache',
            message: 'Headache',
            trigger: 'headache_Opt',
        }, {
            id: 'headache_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Headache', 'Yes');
                        return 'musclePain';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Headache', 'No');
                        return 'musclePain';
                    },
                },
            ]
        }, {
            id: 'musclePain',
            message: 'Muscle Pain',
            trigger: 'musclePain_Opt',
        }, {
            id: 'musclePain_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Muscle Pain', 'Yes');
                        return 'speech';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Muscle Pain', 'No');
                        return 'speech';
                    },
                },
            ]
        }, {
            id: 'speech',
            message: 'Difficulty with speech',
            trigger: 'speech_Opt',
        }, {
            id: 'speech_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Difficulty with speech', 'Yes');
                        return 'jaw';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Difficulty with speech', 'No');
                        return 'jaw';
                    },
                },
            ]
        }, {
            id: 'jaw',
            message: 'Jaw pain',
            trigger: 'jaw_Opt',
        }, {
            id: 'jaw_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Jaw pain', 'Yes');
                        return 'indigestion';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Jaw pain', 'No');
                        return 'indigestion';
                    },
                },
            ]
        }, {
            id: 'indigestion',
            message: 'Indigestion',
            trigger: 'indigestion_Opt',
        }, {
            id: 'indigestion_Opt',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        handleUserResponse('Indigestion', 'Yes');
                        return 'others';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Indigestion', 'No');
                        return 'others';
                    },
                },
            ],
        }, {
            id: 'others',
            message: 'Are there any other symptoms that have occured and would like us to know?',
            trigger: 'others_select',
        }, {
            id: 'others_select',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        return 'others_instruct';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        handleUserResponse('Others', 'None')
                        return 'summary';
                    },
                },
            ],
        }, {
            id: 'others_instruct',
            message: 'Please enter any other symptom(s) that occured in the last month.',
            trigger: 'others_response',
        }, {
            id: 'others_response',
            user: true,
            validator: (value) => {
                if (!value || /^\s*$/.test(value)) {
                    return 'Please enter your symptoms.'
                } // insert user input
                handleUserResponse('Others', value)
                return true
            },
            trigger: 'summary',
        }, {
            id: 'summary',
            message: 'Do you need to change any responses? (You will need to re-select them.)',
            trigger: 'summary_select'
        }, {
            id: 'summary_select',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                    trigger: () => {
                        setUserResponses([]) // clear userResponses
                        return 'change';
                    },
                },
                {
                    value: 2,
                    label: 'No',
                    trigger: () => {
                        return 'done';
                    },
                },
            ],
        }, {
            id: 'done',
            message: 'Thank you. Now, please save your symptoms and I will take you to the training!',
            end: true
        }, {
            id: 'change',
            message: 'Please update your answers.',
            trigger: 'chestDiscomfort',
        }
    ];

    // Creating our own theme
    const theme = {
        background: '#e5c8c1',        // Background color
        headerBgColor: '#12263A',     // Header color
        headerFontSize: '20px',
        botBubbleColor: '#F4EDEA',    // Bot message color
        headerFontColor: 'white',
        botFontColor: 'black',
        userBubbleColor: '#417B5A',   // User message color
        userFontColor: 'white',
    };

    // Set some properties of the bot
    const config = {
        botAvatar: botAvatarImage,
        width: '50vw',
        height: '85vh',
        botDelay: 0,
        userDelay: 0, // to stop user
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <ChatBot
                    steps={steps}
                    headerTitle="Understanding your health issues"
                    placeholder="Type here..."
                    bubbleStyle={{ fontSize: '19px', padding: '.8rem' }}
                    opened={true}
                    {...config}
                />
            </ThemeProvider>
        </>
    )
}

export default Chatbot