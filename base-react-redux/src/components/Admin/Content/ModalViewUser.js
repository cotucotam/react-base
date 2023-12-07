import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { postCreateUser, putUpdateUser } from '../../../services/apiService';
import _ from 'lodash'
// import FormData from 'form-data';

const ModalViewUser = (props) => {
    const { show, setShow, dataView, resetViewData } = props
    // const [show, setShow] = useState(false);

    const handleClose = () => {
        setPreviewImage("")
        setShow(false);
        setEmail("")
        setPassword("")
        setUsername("")
        setRole("USER")
        setImage("")

        resetViewData()
    }
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewimage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            //Update State
            setEmail(dataView.email)
            setPassword(dataView.password)
            setUsername(dataView.username)
            setRole(dataView.role)
            setImage("")
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`)
            }

        }

    }, [dataView])

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
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control"
                                disabled={true}
                                value={password}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input disabled={true}
                                type="text" className="form-control" value={username}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select"
                                disabled={true}
                                value={role}
                                onChange={(event) => { setRole(event.target.value) }}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                                <option>...</option>
                            </select>
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
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser