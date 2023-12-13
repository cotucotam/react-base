import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuizId } from '../../services/apiService';
import _ from 'lodash'
const DetailQuiz = () => {
    const params = useParams()
    const quizId = params.id

    useEffect(() => { fetchQuestion() }, [quizId])
    const fetchQuestion = async () => {
        let res = await getDataQuizId(quizId)
        let questionDescription, image = null
        console.log("question, ", res)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data =
                _.chain(raw)
                    // Group the elements of Array based on `color` property
                    .groupBy("id")
                    // `key` is group's name (color), `value` is the array of objects
                    .map((value, key) => {
                        let answers = []
                        value.forEach((item, index) => {
                            if (index === 0) {
                                questionDescription = item.questionDescription
                                image = item.image
                            }
                            answers.push(item)
                        })



                        return { questionId: key, answers, questionDescription, image }
                    }
                    )
                    .value()
            console.log("data", data)
        }
    }
    return (
        <div>
            DetailQuiz
        </div>
    );
};

export default DetailQuiz;