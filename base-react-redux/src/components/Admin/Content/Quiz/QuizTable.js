import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllQuizForAdmin } from '../../../../services/apiService';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
const QuizTable = () => {
    const [isShowModalUpdateQuiz, setIsShowModalUpdateQuiz] = useState(false)
    const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false)
    const [dataUpdate, setDataUpdate] = useState([])
    const [dataDelete, setDataDelete] = useState([])
    const [listQuiz, setListQuiz] = useState("")

    const handleUpdate = (quiz) => {
        setDataUpdate(quiz)
        setIsShowModalUpdateQuiz(true)
    }

    const handleDelete = (quiz) => {
        setDataDelete(quiz)
        setIsShowModalDeleteQuiz(true)
    }

    useEffect(() => {
        fetchQuiz()
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
        console.log("res", res)
    }
    return (
        <>
            <Table className='table table-hover table-bordered my-2'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button className='btn btn-warning mx-3'
                                        onClick={() => { handleUpdate(item) }}
                                    >Edit</button>
                                    <button className='btn btn-danger'
                                        onClick={() => { handleDelete(item) }}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table >
            <ModalUpdateQuiz
                show={isShowModalUpdateQuiz}
                setShow={setIsShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchQuiz={fetchQuiz}
                setDataUpdate={setDataUpdate}
            />
            <ModalDeleteQuiz
                show={isShowModalDeleteQuiz}
                setShow={setIsShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchQuiz={fetchQuiz}
                setDataDelete={setDataDelete}
            />
        </>
    );
};

export default QuizTable;