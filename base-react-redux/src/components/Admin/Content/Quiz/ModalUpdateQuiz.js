import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiService';
import _ from 'lodash'
// import FormData from 'form-data';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate, fetchQuiz } = props
    // const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setName("")
        setDescription("")
        setStyle("")
        setImage("")
        setPreviewImage("")
        setDataUpdate({})
    }
    const handleShow = () => setShow(true);

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setStyle] = useState("")
    const [image, setImage] = useState("")
    const [previewimage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //Update State
            setName(dataUpdate.name)
            setDescription(dataUpdate.description)
            setStyle(dataUpdate.difficulty)
            setImage("")
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }

        }

    }, [dataUpdate])

    const handleUploadImage = (event) => {
        console.log("upload", event.target.files[0])
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }

    }
    const handleSubmitUpdateUser = async () => {
        //validate

        if (!name) {
            toast.error("inavalid name")
            return
        }

        let data = await putUpdateQuizForAdmin(dataUpdate.id, name, description, type, image)
        if (data.EC === 0 && data) {
            toast.success(data.EM)
            handleClose()
            await fetchQuiz()
        }
        if (data.EC !== 0 && data) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <Modal className='modal-add-user' show={show} onHide={handleClose} size='xl' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Update a quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control"
                                value={name}
                                onChange={(event) => { setName(event.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control"
                                value={description}
                                onChange={(event) => { setDescription(event.target.value) }} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Style</label>
                            <select className="form-select"
                                value={type}
                                onChange={(event) => { setStyle(event.target.value) }}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                        <div className='"col-md-12"'>
                            <label className='form-label label-upload' htmlFor='labelUpload'>
                                <FaPlus />
                                Upload Image
                            </label>
                            <input type='file' hidden id='labelUpload'
                                onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewimage ?
                                <img src={previewimage}></img> :
                                <span>Preview Image</span>}

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdateUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz