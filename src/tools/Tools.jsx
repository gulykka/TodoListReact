import React from 'react';
import AddTodo from "./AddTodo";
import SortFunc from "./SortFunc";

const Tools = () => {
    return (
        <div className={'navbar tools'}>
            <AddTodo/>
            <SortFunc/>
        </div>
    );
};

export default Tools;