import React from 'react';
import _ from 'lodash'
const Question = (props) => {
    const { index, data } = props
    const handleCheckbox = (event, answerId, questionId) => {
        props.handleCheckbox(answerId, questionId)
    }
    if (_.isEmpty(data)) {
        return (<></>)
    }
    return (
        <>  {data.image ?
            <div className='q-image'>
                <img src={`data: image /jpeg;base64,${data.image}`} />
            </div>
            :
            <div className='q-image'>

            </div>
        }

            <div className='question'>Question {index + 1}: {data?.questionDescription}</div>
            <div className='answer'>
                {data.answers.map((a, index) => {
                    return (
                        <div className='a-child'
                            key={`answer-${index}`}>
                            <div className="form-check">
                                <input className="form-check-input"
                                    type="checkbox"
                                    checked={a.isSelected}
                                    onChange={(event) => { handleCheckbox(event, a.id, data.questionId) }}
                                    id="flexCheckDefault" />
                                <label className="form-check-label">
                                    {a.description}
                                </label>
                            </div>

                        </div>
                    )
                })}

            </div>
        </>
    );
};

export default Question