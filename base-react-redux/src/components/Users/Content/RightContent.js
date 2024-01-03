import React from 'react';

const RightContent = (props) => {
    const { dataQuiz } = props
    console.log("dataQuiz: ", dataQuiz)
    return (
        <>
            <div className='main-timer'>
                10:10
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