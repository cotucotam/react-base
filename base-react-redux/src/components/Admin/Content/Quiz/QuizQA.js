import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import './QuizQA.scss'
import { BsPatchPlus, BsPatchMinus } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreatMewAnswerForQuestion, postCreatMewQuestionForQuiz, getQuizWithQA, postUpsetQA } from '../../../../services/apiService';
import { toast } from 'react-toastify';
const QuizQA = () => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const initQuestions = [
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
    ]
    const [questions, setQuestions] = useState(initQuestions)
    const [listQuiz, setListQuiz] = useState({})
    useEffect(() => {
        fetchQuiz()
    }, [])

    // return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value)
        if (res && res.EC == 0) {
            //convert base64 to File object
            let newQA = []
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i]
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}`
                    q.imageFile =
                        await urltoFile(`data:image/pnj;base64,${q.imageFile}`, `Question-${q.id}`, 'image/pnj')
                }
                newQA.push(q)
            }
            setQuestions(newQA)
            // console.log("DEBUG newQA", newQA)
            // console.log("DEBUG fetchQuizWithQA", res)
        }
    }
    useEffect(() => {
        fetchQuizWithQA()
    }, [selectedQuiz])

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

    const handleSubmitQuestionForQuiz = async () => {
        //submit questions
        // await Promise.all(
        //     questions.map(async (question) => {
        //         const q = await postCreatMewQuestionForQuiz(
        //             +selectedQuiz.value,
        //             question.description,
        //             question.imageFile);
        //         //submit answer
        //         await Promise.all(question.answers.map(async (answer) => {
        //             await postCreatMewAnswerForQuestion(
        //                 answer.description,
        //                 answer.isCorrect,
        //                 q.DT.id)
        //         }))
        //     })
        // )

        //validate data
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz")
            return
        }
        //validate answer
        let isValidAnswer = true
        let indexQ = 0, indexA = 0
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false
                    indexA = j
                    break
                }
            }
            indexQ = i
            if (isValidAnswer === false) break
        }

        if (isValidAnswer === false) {
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`)
        }
        //validate question
        let isValidQ = true
        let indexQ1 = 0
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false
                indexQ1 = i
            }
        }
        if (isValidQ === false) {
            toast.error(`Not empty description for question ${indexQ1 + 1}`)
            return
        }

        //submit questions
        let questionClone = _.cloneDeep(questions)

        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile) {
                questionClone[i].imageFile =
                    await toBase64(questionClone[i].imageFile)
            }
        }
        let res = await postUpsetQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        })
        if (res.EC !== 0 && res) {
            toast.error(res.EM)

        }
        else {
            toast.success('Create questions and answers success')
        }
        console.log("res: ", res)

    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    return (
        <div className='questions-container'>
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

export default QuizQA;