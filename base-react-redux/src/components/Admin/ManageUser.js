import ModalCreateUser from './Content/ModalCreateUser'
import './Content/ManageUser.scss'
import { FaPlus } from "react-icons/fa";
import { useState } from 'react';
import TableUser from './Content/TableUser';
const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

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
                    <TableUser />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser} />
            </div>


        </div>
    );
};

export default ManageUser;