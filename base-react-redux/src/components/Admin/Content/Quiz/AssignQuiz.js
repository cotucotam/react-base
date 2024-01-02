import React from 'react';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
import Select from 'react-select'
import { toast } from 'react-toastify';
const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState({})
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listUser, setListUser] = useState({})
    const [selectedUser, setSelectedUser] = useState({})
    useEffect(() => {
        fetchQuiz()
        fetchUser();
    }, [])
    const handleAssign = async () => {
        let data = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (data.EC === 0 && data) {
            toast.success(data.EM)
        }
        if (data.EC !== 0 && data) {
            toast.error(data.EM)
        }
    }
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
    const fetchUser = async () => {
        let res = await getAllUsers()

        if (res && res.EC === 0) {
            let user = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            }
            )
            setListUser(user)
        }

    }

    return (
        <div className='assign-quiz-container row'>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz:</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select User:</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button className='btn btn-warning mt-3'
                    onClick={() => handleAssign()}
                >Assign</button>
            </div>
        </div>
    );
};

export default AssignQuiz;