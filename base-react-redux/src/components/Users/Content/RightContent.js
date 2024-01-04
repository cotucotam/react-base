import React, { useRef } from 'react';
import CountDown from './CountDown';

const RightContent = (props) => {
    const refDiv = useRef([])

    const { dataQuiz, handleFinishQuiz, setIndex } = props
    const onTimeUp = () => {
        handleFinishQuiz()
        alert('times up')
    }
    const getClassQuestion = (index, question) => {

        // Check answerd
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true)
            if (isAnswered) {
                return "question selected"
            }
        }
        return "question"

    }
    const handleClickQuestion = (index, question) => {
        setIndex(index)
        // reset all clicked
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className == "question clicked") {
                    item.className = "question"
                }
            })
            console.log("ref", refDiv.current)
        }
        // set clicked
        // Check answerd
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true)
            if (isAnswered) {
                return
            }
        }

        refDiv.current[index].className = "question clicked"
        setIndex(index)
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
                            <div
                                onClick={() => handleClickQuestion(index, item)}
                                className={getClassQuestion(index, item)}
                                key={index + 1}
                                ref={element => refDiv.current[index] = element}
                            >
                                {index + 1}
                            </div>
                        )
                    })}


            </div>
        </>
    );
};

export default RightContent;