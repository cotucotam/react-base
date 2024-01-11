import React, { useState } from 'react';
import SidebarAdmin from './SidebarAdmin'
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from '../Header/Language';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dashboard from './Content/Quiz/Dashboard';
const Admin = () => {
    const [collapsed, setcollapsed] = useState(false)
    return (
        <div className='admin-container'>
            <div className='admin-sidebar'>
                <SidebarAdmin collapsed={collapsed} />
            </div>
            <div className='admin-content'>
                <div className='admin-header'>
                    <span onClick={() => { setcollapsed(!collapsed) }}>
                        <FaBars className='leftside' />
                    </span>
                    <div className='rightside'>
                        <Language />
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                Log Out
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >
                                Profile
                            </NavDropdown.Item>
                        </NavDropdown>


                    </div>
                </div>
                <PerfectScrollbar>
                    <div className='admin-main'>
                        <Outlet />
                        <Dashboard />
                    </div>
                </PerfectScrollbar>

            </div>
        </div>
    );
};

export default Admin;