import React from 'react';
import './ui.sass'

const ButtonSecond = (props) => {
    return (
        <button
            className={'button_2'}
            onClick={props.func}
            disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default ButtonSecond;