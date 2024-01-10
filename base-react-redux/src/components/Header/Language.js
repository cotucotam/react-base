import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Language = () => {
    return (
        <NavDropdown title="Việt Nam" id="basic-nav-dropdown2" className='languages'>
            <NavDropdown.Item>
                English
            </NavDropdown.Item>
            <NavDropdown.Item >
                Việt Nam
            </NavDropdown.Item>
        </NavDropdown>
    );
};

export default Language;