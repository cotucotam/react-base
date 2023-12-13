import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuizId } from '../../services/apiService';
const DetailQuiz = () => {
    const params = useParams()
    const quizId = params.id

    useEffect(() => { fetchQuestion() }, [quizId])
    const fetchQuestion = async () => {
        let res = await getDataQuizId(quizId)
        console.log("question, ", res)
    }
    return (
        <div>
            DetailQuiz
        </div>
    );
};

export default DetailQuiz;