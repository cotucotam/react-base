import axios from '../ultis/axiosCustomize';

const postCreateUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('v1/participant', data)
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('v1/participant', data)
}

const getAllUsers = () => {
    return axios.get('v1/participant/all')
}

const deleteUsers = (userId) => {
    return axios.delete('v1/participant', { data: { id: userId } })
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post(`v1/login`, { email, password, delay: 5000 })
}
const postRegister = (email, username, password) => {
    return axios.post(`v1/register`, { email, username, password })
}
const getQuizByUser = () => {
    return axios.get(`v1/quiz-by-participant/`)
}
const getDataQuizId = (id) => {
    return axios.get(`v1/questions-by-quiz?quizId=${id}`)
}
const postSubmitQuiz = (data) => {
    return axios.post(`v1/quiz-submit`, { ...data })
}
const getAllQuizForAdmin = () => {
    return axios.get(`v1/quiz/all`)
}
const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);

    return axios.post('v1/quiz', data)
}
const putUpdateQuizForAdmin = (id, name, description, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);

    return axios.put('v1/quiz', data)
}
const deleteQuizForAdmin = (id) => {

    return axios.delete(`v1/quiz/${id}`)
}
const postCreatMewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);

    return axios.post('v1/question', data)
}
const postCreatMewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('v1/answer', { description, correct_answer, question_id, })
}
const postAssignQuiz = (quizId, userId) => {
    return axios.post('v1/quiz-assign-to-user', { quizId, userId })
}
const getQuizWithQA = (quizId) => {
    return axios.get(`v1/quiz-with-qa/${quizId}`)
}
export {
    postCreateUser, getAllUsers, putUpdateUser,
    deleteUsers, getUserWithPaginate, postLogin,
    postRegister, getQuizByUser, getDataQuizId,
    postSubmitQuiz, postCreateNewQuiz,
    getAllQuizForAdmin, deleteQuizForAdmin, putUpdateQuizForAdmin,
    postCreatMewQuestionForQuiz, postCreatMewAnswerForQuestion,
    postAssignQuiz, getQuizWithQA
}