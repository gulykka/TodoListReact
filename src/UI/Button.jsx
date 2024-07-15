import React from 'react';
import './ui.sass'

const Button = (props) => {
    return (
        <button
            className={'button_1'}
            onClick={props.clickFunc}
            disabled={props.disabled}
            >
            {props.children}
        </button>
    );
};

export default Button;