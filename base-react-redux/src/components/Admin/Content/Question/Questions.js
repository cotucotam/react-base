import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import './Questions.scss'
import { BsPatchPlus, BsPatchMinus } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreatMewAnswerForQuestion, postCreatMewQuestionForQuiz } from '../../../../services/apiService';
const Questions = () => {
    const [listQuiz, setListQuiz] = useState({})
    useEffect(() => {
        fetchQuiz()
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            }
            )
            setListQuiz(newQuiz)
        }


    }
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: 'question 1',
            imageName: '',
            imageFile: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'answer 1',
                    isCorrect: false
                },
                {
                    id: uuidv4(),
                    description: 'answer 2',
                    isCorrect: false
                }
            ]
        },
    ])
    const handleAddRemoveQuestion = (type, id) => {

        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: 'question 1',
                imageName: '',
                imageFile: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion])

        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions)
            questionsClone = questionsClone.filter(item => item.id !== id)
            setQuestions(questionsClone)
        }
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
        }



        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)

            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)
        }
    }


    const handleOnChange = (type, questionId, value) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'QUESTION') {
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionsClone[index].description = value
                setQuestions(questionsClone)
            }
        }
    }
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0]
            questionsClone[index].imageName = event.target.files[0].name
            setQuestions(questionsClone)
        }
    }
    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map((answer) => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value
                    }
                    if (type === 'INPUT') {
                        answer.description = value
                    }

                }
                return answer
            })
            setQuestions(questionsClone)
        }
    }
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })
    const hanlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setDataImagePreview({
                title: questionsClone[index].imageName,
                url: URL.createObjectURL(questionsClone[index].imageFile)
            })
            setIsPreviewImage(true)
        }

    }
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const handleSubmitQuestionForQuiz = async () => {
        //submit questions
        await Promise.all(
            questions.map(async (question) => {
                const q = await postCreatMewQuestionForQuiz(
                    +selectedQuiz.value,
                    question.description,
                    question.imageFile);
                //submit answer
                await Promise.all(question.answers.map(async (answer) => {
                    await postCreatMewAnswerForQuestion(
                        answer.description,
                        answer.isCorrect,
                        q.DT.id)
                }))
            })
        )



        // 
    }
    return (
        <div className='questions-container'>
            <div className='title'>
                Manage Question
            </div>
            <hr />
            <div className='add-new-questions'>
                <div className='col-6'>
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add Question:
                </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content'>

                                    <div className="form-floating description">
                                        <input type="type"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder='cotam'
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)} />
                                        <label>Question {index + 1} 's description</label>
                                    </div>
                                    <div className='group-upload'>

                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-upload' />
                                        </label>
                                        <input type={'file'} hidden
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)} />
                                        <span>
                                            {question.imageName ?
                                                <span
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => hanlePreviewImage(question.id)}>
                                                    {question.imageName}
                                                </span> :
                                                '0 file is uploaded'
                                            }
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span>
                                            <AiFillPlusSquare className='icon-add'
                                                onClick={() => handleAddRemoveQuestion('ADD', '')} />
                                        </span>
                                        {questions.length > 1 &&
                                            <span>
                                                <AiOutlineMinusCircle className='icon-remove'
                                                    onClick={() => handleAddRemoveQuestion('REMOVE', question.id)} />
                                            </span>}
                                    </div>
                                </div>
                                {question.answers && question.answers.length
                                    && question.answers.map((answer, index) => {
                                        return (
                                            < div key={answer.id} className='answer-content' >
                                                <input className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    id="flexCheckDefault"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => {
                                                        handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)
                                                    }}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input type="type"
                                                        value={answer.description}
                                                        className="form-control"
                                                        id="floatingInput"
                                                        onChange={(event) => {
                                                            handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)
                                                        }}
                                                    />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                                                        <AiFillPlusSquare className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiOutlineMinusCircle className='icon-remove' />
                                                        </span>}
                                                </div>

                                            </div>
                                        )
                                    })
                                }


                            </div>

                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button className='btn btn-warning'
                            onClick={() => handleSubmitQuestionForQuiz()}>
                            Save Questions
                        </button>
                    </div>
                }

            </div>
            {isPreviewImage === true &&
                <Lightbox
                    image={dataImagePreview.url}
                    title={dataImagePreview.title}
                    onClose={() => setIsPreviewImage(false)}>

                </Lightbox>
            }

        </div>
    );
};

export default Questions;