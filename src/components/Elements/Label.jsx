import React from 'react'

function Label(props) {
    const {children, name, classname} = props; 
    return (
        <label htmlFor={name} className={`select-none ${classname}`}>{children}</label>
    );
}

export default Label;