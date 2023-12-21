import React, { useState } from 'react';
import Select from 'react-select'
import './Questions.scss'
import { BsPatchPlus, BsPatchMinus } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
const Questions = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: 'question 1',
            image: '',
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
                image: '',
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
            console.log(type, questionId, answerId)
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === questionId)
            console.log(index)
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
    const [selectedQuiz, setSelectedQuiz] = useState({})

    console.log(">>> Question ", questions)
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
                        options={options}
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
                                            value={question.description} />
                                        <label>Question {index + 1} 's description</label>
                                    </div>
                                    <div className='group-upload'>

                                        <label ><RiImageAddFill className='label-upload' /></label>
                                        <input type={'file'} hidden />
                                        <span>0 file is uploaded</span>
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
                                                />
                                                <div className="form-floating answer-name">
                                                    <input type="type"
                                                        value={answer.description}
                                                        className="form-control"
                                                        id="floatingInput" />
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
                                    })}

                            </div>

                        )
                    })
                }

            </div>
        </div>
    );
};

export default Questions;