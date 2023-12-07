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

export { postCreateUser, getAllUsers, putUpdateUser, deleteUsers, getUserWithPaginate }