import React from "react";
import "./css/ToDoCSS.scss";
import ToDoListItem from "./ToDoListItem";

const ToDoList = ({list}) => {
    return (
        <div className="ToDoList">
            {
                list.map(item => (
                    <ToDoListItem 
                        key={item.id}
                        item={item}
                    />
                ))
            }    
        </div>
    );
}

export default React.memo(ToDoList);