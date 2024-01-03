import React from 'react';
import CountDown from './CountDown';

const RightContent = (props) => {
    const { dataQuiz, handleFinishQuiz } = props
    const onTimeUp = () => {
        handleFinishQuiz()
        alert('times up')
    }
    return (
        <>
            <div className='main-timer'>
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className='main-question'>
                {dataQuiz && dataQuiz.length > 0
                    && dataQuiz.map((item, index) => {
                        return (
                            <div className='question' key={index + 1}>{index + 1}</div>
                        )
                    })}


            </div>
        </>
    );
};

export default RightContent;