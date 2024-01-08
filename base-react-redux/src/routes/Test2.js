import React from 'react';

const Test2 = (props) => {
    return (
        <div>
            I am a child Test 1
            <div>{props.children}</div>
        </div>
    );
};

export default Test2;