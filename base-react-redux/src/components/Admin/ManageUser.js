import ModalCreateUser from './Content/ModalCreateUser'
import './Content/ManageUser.scss'
import { FaPlus } from "react-icons/fa";
import { useState } from 'react';
import TableUser from './Content/TableUser';

import { useEffect } from 'react';
import { getAllUsers, getUserWithPaginate } from '../../services/apiService';
import ModalUpdateUser from './Content/ModalUpdateUser';
import ModalViewUser from './Content/ModalViewUser';
import ModalDeleteUser from './Content/ModalDeleteUser';
import TablePaginate from './Content/TablePaginate';

const ManageUser = (props) => {
    const LIMIT_USER = 5
    const [pageCount, setPageCount] = useState(0);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setshowModalUpdateUser] = useState(false)
    const [showModalViewUser, setshowModalViewUser] = useState(false)
    const [showModalDeleteUser, setshowModalDeleteUser] = useState(false)
    const [dataUpdate, setdataUpdate] = useState({})
    const [dataView, setdataView] = useState({})
    const [dataDelete, setdataDelete] = useState({})
    const [listUser, setListUser] = useState([])
    const fetchListUser = async () => {
        let res = await getAllUsers()
        if (res.EC == 0) {
            setListUser(res.DT)
        }
    }
    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER)
        console.log("res.DT.users: ", res)
        if (res.EC == 0) {
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }
    const hanldeClickBtnUpdate = (user) => {
        setdataUpdate(user)
        setshowModalUpdateUser(true)
    }
    const hanldeClickBtnView = (user) => {
        setdataView(user)
        setshowModalViewUser(true)
    }
    const hanldeClickBtnDelete = (user) => {
        setdataDelete(user)
        setshowModalDeleteUser(true)
    }
    const resetUpdateData = () => {
        setdataUpdate({})
    }
    const resetViewData = () => {
        setdataView({})
    }
    useEffect(() => {
        // fetchListUser()
        fetchListUserWithPaginate(1, LIMIT_USER)
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
                    {/* <TableUser
                        listUser={listUser}
                        hanldeClickBtnUpdate={hanldeClickBtnUpdate}
                        hanldeClickBtnView={hanldeClickBtnView}
                        hanldeClickBtnDelete={hanldeClickBtnDelete}
                    /> */}
                    <TablePaginate
                        listUser={listUser}
                        hanldeClickBtnUpdate={hanldeClickBtnUpdate}
                        hanldeClickBtnView={hanldeClickBtnView}
                        hanldeClickBtnDelete={hanldeClickBtnDelete}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser} />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setshowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    dataView={dataView}
                    show={showModalViewUser}
                    setShow={setshowModalViewUser}
                    fetchListUser={fetchListUser}
                    resetViewData={resetViewData}
                />
                <ModalDeleteUser
                    dataDelete={dataDelete}
                    show={showModalDeleteUser}
                    setShow={setshowModalDeleteUser}
                    fetchListUser={fetchListUser}
                />
            </div>


        </div>
    );
};

export default ManageUser;