import ModalCreateUser from './Content/ModalCreateUser'
import './Content/ManageUser.scss'
import { FaPlus } from "react-icons/fa";
import { useState } from 'react';
import TableUser from './Content/TableUser';

import { useEffect } from 'react';
import { getAllUsers } from '../../services/apiService';

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [listUser, setListUser] = useState([])
    const fetchListUser = async () => {
        let res = await getAllUsers()
        if (res.EC == 0) {
            setListUser(res.DT)
        }
    }
    useEffect(() => {
        fetchListUser()
    }, []);
    return (
        <div className='manage-user-container'>
            <div className='title'>
                Manage user
            </div>
            <div className='users-content'>
                <div className='btn-add-new'>
                    <button className='btn btn-primary'
                        onClick={() => setShowModalCreateUser(true)}>
                        <FaPlus />
                        Add new user

                    </button>
                </div>
                <div className='table-user-container'>
                    <TableUser listUser={listUser} />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser} />
            </div>


        </div>
    );
};

export default ManageUser;