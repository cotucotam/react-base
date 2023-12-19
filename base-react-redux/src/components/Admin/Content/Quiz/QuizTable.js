import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllQuizForAdmin } from '../../../../services/apiService';
const QuizTable = () => {
    const [listQuiz, setListQuiz] = useState("")
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
                                <button className='btn btn-warning mx-3'>Edit</button>
                                <button className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    )
                })}

            </tbody>
        </Table >
    );
};

export default QuizTable;