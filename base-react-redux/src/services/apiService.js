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
const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);

    return axios.post('v1/quiz', data)
}
export {
    postCreateUser, getAllUsers, putUpdateUser,
    deleteUsers, getUserWithPaginate, postLogin,
    postRegister, getQuizByUser, getDataQuizId,
    postSubmitQuiz, postCreateNewQuiz
}