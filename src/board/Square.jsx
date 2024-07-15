import React from 'react';
import './board.sass'

const Square = ({value, change}) => {
    return (
        <button
            onClick={() => change()}
            className={'square'}>
            {value}
        </button>
    );
};

export default Square;