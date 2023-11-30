import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
// import FormData from 'form-data';

const ModalCreateUser = (props) => {
    const { show, setShow } = props
    // const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setEmail("")
        setPassword("")
        setUsername("")
        setRole("USER")
        setImage("")
        setPreviewImage("")
    }
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewimage, setPreviewImage] = useState("")

    const handleUploadImage = (event) => {
        console.log("upload", event.target.files[0])
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }

    }

    const handleSubmitCreateUser = async () => {
        //validate

        //call apis
        // let data = {
        //     email: email,
        //     password: password,
        //     username: username,
        //     role: role,
        //     userImage: image
        // }


        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', username);
        data.append('role', role);
        data.append('userImage', image);

        let respone = await axios.post('http://localhost:8081/api/v1/participant', data)
        console.log("respone", respone)
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Add new user
            </Button> */}

            <Modal className='modal-add-user' show={show} onHide={handleClose} size='xl' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email}
                                onChange={(event) => { setEmail(event.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password}
                                onChange={(event) => { setPassword(event.target.value) }} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" placeholder="1234 Main St" value={address}
                                onChange={(event) => { setAddress(event.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username}
                                onChange={(event) => { setUsername(event.target.value) }} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select"
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

export default ModalCreateUser