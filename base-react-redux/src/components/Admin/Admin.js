import React, { useState } from 'react';
import SidebarAdmin from './SidebarAdmin'
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
const Admin = () => {
    const [collapsed, setcollapsed] = useState(false)
    return (
        <div className='admin-container'>
            <div className='admin-sidebar'>
                <SidebarAdmin collapsed={collapsed} />
            </div>
            <div className='admin-content'>
                <FaBars onClick={() => {
                    setcollapsed(!collapsed)
                }} />
                admin content
            </div>
        </div>
    );
};

export default Admin;