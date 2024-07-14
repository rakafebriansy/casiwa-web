import React from 'react'

function Label(props) {
    const {children, name} = props; 
    return (
        <label htmlFor={name}>{children}</label>
    );
}

export default Label;