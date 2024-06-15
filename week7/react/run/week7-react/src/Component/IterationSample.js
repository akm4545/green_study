import React from "react";

const IterationSample = () => {
    const names = ['1', '2', '3', '4']
    const nameList = names.map( (name, index) => <li key={index}>{name}</li>)
    return (
        <ul>
            {nameList}
        </ul>
    )
}

export default IterationSample;