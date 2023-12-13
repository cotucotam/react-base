import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDataQuizId } from '../../services/apiService';
import _ from 'lodash'
import "./DetailQuiz.scss"

const DetailQuiz = () => {
    const params = useParams()
    const quizId = params.id
    const location = useLocation()
    console.log("location, ", location)
    useEffect(() => { fetchQuestion() }, [quizId])
    const fetchQuestion = async () => {
        let res = await getDataQuizId(quizId)
        let questionDescription, image = null

        if (res && res.EC === 0) {
            let raw = res.DT
            let data =
                _.chain(raw)
                    // Group the elements of Array based on `color` property
                    .groupBy("id")
                    // `key` is group's name (color), `value` is the array of objects
                    .map((value, key) => {
                        let answers = []
                        value.forEach((item, index) => {
                            if (index === 0) {
                                questionDescription = item.questionDescription
                                image = item.image
                            }
                            answers.push(item)
                        })



                        return { questionId: key, answers, questionDescription, image }
                    }
                    )
                    .value()
            console.log("data", data)
        }
    }
    return (
        <div className='detail-quiz-container'>
            <div className='left-container'>
                <div className='title'>
                    Quiz {quizId} :{location?.state?.quizTitle}
                </div>
                <hr />
                <div className='q-body'>
                    <img />
                </div>
                <div className='q-content'>
                    <div className='question'>question 1: who are you?</div>
                    <div className='answer'>
                        <div className='a-child'>A.tam</div>
                        <div className='a-child'>B.tam</div>
                        <div className='a-child'>C.tam</div>
                    </div>
                </div>
                <div className='footer'>
                    <button className='btn btn-secondary'>Privious</button>
                    <button className='btn btn-primary'>Next</button>
                </div>
            </div>
            <div className='right-container'>
                count down
            </div>
        </div>
    );
};

export default DetailQuiz;