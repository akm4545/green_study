import React from "react";

const ToDoListItem = ({item}) => {
    const {id, title, content} = item;
    return (
        <div>
            <p>{title}</p>
            <p>{content}</p>
        </div>
    );
}

export default React.memo(ToDoListItem);