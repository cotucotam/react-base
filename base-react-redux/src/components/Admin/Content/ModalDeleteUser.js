import { useState } from 'react';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import _ from 'lodash'
import { deleteUsers } from '../../../services/apiService';
import { toast } from 'react-toastify';
const ModalDeleteUser = (props) => {

    const { show, setShow, dataDelete, fetchListUser, fetchListUserWithPaginate, setCurrentPage } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewimage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataDelete)) {
            //Update State
            setEmail(dataDelete.email)
            setPassword(dataDelete.password)
            setUsername(dataDelete.username)
            setRole(dataDelete.role)
            setImage("")
            if (dataDelete.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataDelete.image}`)
            }

        }

    }, [dataDelete])

    const handleSubmitDeleteUser = async () => {
        //validate
        console.log("id", dataDelete.id)
        if (!username) {
            toast.error("inavalid username")
            return
        }

        let data = await deleteUsers(dataDelete.id)
        if (data.EC === 0 && data) {
            toast.success(data.EM)
            handleClose()
            // await fetchListUser()
            setCurrentPage(1)
            await fetchListUserWithPaginate(1)

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
                    <Modal.Title>Confirm delete user?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>
                        Are you sure to delete this user. email = {email}!
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteUser;