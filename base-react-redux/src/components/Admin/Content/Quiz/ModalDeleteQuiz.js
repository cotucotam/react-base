import { useState } from 'react';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import _ from 'lodash'
import { toast } from 'react-toastify';
import { deleteQuizForAdmin } from '../../../../services/apiService';
const ModalDeleteQuiz = (props) => {

    const { show, setShow, dataDelete, fetchQuiz } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteQuiz = async () => {

        let data = await deleteQuizForAdmin(dataDelete.id)
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
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>
                        Are you sure to delete this quiz!
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteQuiz;