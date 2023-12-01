import React, { useState } from 'react';
import SidebarAdmin from './SidebarAdmin'
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const [collapsed, setcollapsed] = useState(false)
    return (
        <div className='admin-container'>
            <div className='admin-sidebar'>
                <SidebarAdmin collapsed={collapsed} />
            </div>
            <div className='admin-content'>
                <div className='admin-header'>
                    <FaBars onClick={() => {
                        setcollapsed(!collapsed)
                    }} />
                </div>
                <div className='admin-main'>
                    <Outlet />
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Admin;