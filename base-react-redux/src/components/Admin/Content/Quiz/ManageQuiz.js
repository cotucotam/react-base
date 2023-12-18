import React, { useState } from 'react';
import "./ManageQuiz.scss"
import Select from 'react-select'
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
const ManageQuiz = (props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' }
    ]
    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }
    const handSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error("Name/Description is required")
            return
        }
        let data = await postCreateNewQuiz(description, name, type?.value, image)
        console.log("data", data)

        if (data.EC === 0 && data) {
            toast.success(data.EM)
            // handleClose()
            // // await fetchListUser()
            // setCurrentPage(1)
            // await fetchListUserWithPaginate(1)
        }
        if (data.EC !== 0 && data) {
            toast.error(data.EM)
        }
    }

    return (
        <div className='quiz-container'>
            <div className='title'>
                Manage Quizzes
            </div>
            <hr />
            <div className='add-new'>

                <fieldset className="border rounded-3 p-3" >
                    <legend className="float-none w-auto px-3">Add new Quiz</legend>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            placeholder='Your quiz name'
                            value={name}
                            onChange={(event) => setName(event.target.value)} />
                        <label >Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text"
                            className="form-control"
                            placeholder='Description'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)} />
                        <label >Description</label>
                    </div>
                    <div className='my-3'>
                        <Select
                            defaultValue={type}
                            onChange={setType}
                            options={options}
                            placeholder="Quiz style ..."
                        />
                    </div>
                    <div className='more-actions form-group'>
                        <label className='mb-1'>Upload Image</label>
                        <input type="file"
                            className="form-control"
                            onChange={(event) => { handleChangeFile(event) }} />

                    </div>
                    <div className='mt-3'>
                        <button
                            onClick={() => { handSubmitQuiz() }}
                            className='btn btn-warning'>
                            Save
                        </button>
                    </div>
                </fieldset>
            </div>
            <div className='list-detail'>

            </div>

        </div>
    );
};

export default ManageQuiz;