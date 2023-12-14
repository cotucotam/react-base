import { useState } from 'react';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import _ from 'lodash'

import { toast } from 'react-toastify';
const ModalResults = (props) => {

    const { show, setShow, dataModalResult } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewimage, setPreviewImage] = useState("")

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Your results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Question: {dataModalResult.countTotal}</div>
                    <div>Total Correct answer: {dataModalResult.countCorrect}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show answer
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalResults;