import React, { useState } from 'react';
import Select from 'react-select'
import './Questions.scss'
import { BsPatchPlus, BsPatchMinus } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
const Questions = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})
    return (
        <div className='questions-container'>
            <div className='title'>
                Manage Question
            </div>
            <div className='add-new-questions'>
                <div className='col-6'>
                    <label>Select Quiz:</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3'>
                    Add Question:
                </div>
                <div>
                    <div className='questions-content'>

                        <div className="form-floating description">
                            <input type="type" class="form-control" id="floatingInput" />
                            <label>Question Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-upload'>Upload Image</label>
                            <input type={'file'} hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <BsPatchPlus className='icon-add' />
                            </span>
                            <span>
                                <BsPatchMinus className='icon-remove' />
                            </span>
                        </div>
                    </div>
                    <div className='answer-content'>
                        <input className="form-check-input iscorrect"
                            type="checkbox"
                            id="flexCheckDefault" />
                        <div className="form-floating answer-name">
                            <input type="type" class="form-control" id="floatingInput" />
                            <label>Answer 1</label>
                        </div>
                        <div className='btn-group'>
                            <span>
                                <AiFillPlusSquare className='icon-add' />
                            </span>
                            <span>
                                <AiOutlineMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Questions;