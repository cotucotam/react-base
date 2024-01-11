import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDataQuizId, postSubmitQuiz } from '../../services/apiService';
import _ from 'lodash'
import "./DetailQuiz.scss"
import Question from './Question';
import ModalResult from './ModalResults';
import RightContent from './Content/RightContent';

const DetailQuiz = () => {
    const params = useParams()
    const quizId = params.id
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState("")
    const [index, setIndex] = useState(0)
    const [isShowModelResult, setIsShowModelResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})
    const handlePrev = () => {
        if (index - 1 < 0) return
        setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }
    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (item.id === answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            question.answers = b
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }
    const handleFinishQuiz = async () => {
        console.log("check data be4 submit", dataQuiz)
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {

                let questionId = question.questionId
                let userAnswerId = []
                question.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
        }
        payload.answers = answers
        // submit api
        let res = await postSubmitQuiz(payload)
        console.log("res", res)
        if (res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setIsShowModelResult(true)
        } else {
            alert("")
        }
    }
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
                                questionDescription = item.description
                                image = item.image
                            }
                            item.answers.isSelected = false
                            answers.push(item.answers)
                        })


                        answers = _.orderBy(answers, ['id'], ['asc'])
                        return { questionId: key, answers, questionDescription, image }
                    }
                    )
                    .value()
            setDataQuiz(data)
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
                    <Question
                        handleCheckbox={handleCheckbox}
                        index={index}
                        data={
                            dataQuiz.length > 0 ? dataQuiz[index] : []
                        } />
                </div>
                <div className='footer'>
                    <button className='btn btn-secondary'
                        onClick={() => handlePrev()}
                    >Privious</button>
                    <button className='btn btn-primary'
                        onClick={() => handleNext()}
                    >Next</button>
                    <button className='btn btn-warning'
                        onClick={() => handleFinishQuiz()}
                    >Finish</button>
                </div>
            </div>
            <div className='right-container'>
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                    setIndex={setIndex}
                />
            </div>
            <ModalResult
                show={isShowModelResult}
                setShow={setIsShowModelResult}
                dataModalResult={dataModalResult}
            />
        </div>
    );
};

export default DetailQuiz;