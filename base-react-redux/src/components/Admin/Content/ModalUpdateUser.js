import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { postCreateUser, putUpdateUser } from '../../../services/apiService';
import _ from 'lodash'
// import FormData from 'form-data';

const ModalUpdateUser = (props) => {
    const { show, setShow, fetchListUser, dataUpdate, resetUpdateData, fetchListUserWithPaginate, setCurrentPage } = props
    // const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setEmail("")
        setPassword("")
        setUsername("")
        setRole("USER")
        setImage("")
        setPreviewImage("")
        resetUpdateData()
    }
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewimage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //Update State
            setEmail(dataUpdate.email)
            setPassword(dataUpdate.password)
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
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
    const handleSubmitCreateUser = async () => {
        //validate

        if (!username) {
            toast.error("inavalid username")
            return
        }

        let data = await putUpdateUser(dataUpdate.id, username, role, image)
        if (data.EC === 0 && data) {
            toast.success(data.EM)
            handleClose()
            // await fetchListUser()
            setCurrentPage(props.currentPage)
            await fetchListUserWithPaginate(props.currentPage)
        }
        if (data.EC !== 0 && data) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Add new user
            </Button> */}

            <Modal className='modal-add-user' show={show} onHide={handleClose} size='xl' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control"
                                value={email}
                                disabled={true}
                                onChange={(event) => { setEmail(event.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control"
                                disabled={true}
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username}
                                onChange={(event) => { setUsername(event.target.value) }} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select"
                                value={role}
                                onChange={(event) => { setRole(event.target.value) }}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                                <option>...</option>
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
                    <Button variant="primary" onClick={handleSubmitCreateUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser