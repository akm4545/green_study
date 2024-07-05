import React from "react";
import "./css/ToDoCSS.scss";
import ToDoListItem from "./ToDoListItem";

const ToDoList = ({list, onDblclick, onDelete, onUpdateForm, onUpdate}) => {
    return (
        <div className="ToDoList">
            {
                list.map(item => (
                    <ToDoListItem 
                        key={item.id}
                        item={item}
                        onDblclick={onDblclick}
                        onDelete={onDelete}
                        onUpdateForm={onUpdateForm}
                        onUpdate={onUpdate}
                    />
                ))
            }    
        </div>
    );
}

export default React.memo(ToDoList);