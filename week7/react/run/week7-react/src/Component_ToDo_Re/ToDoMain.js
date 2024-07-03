import React from "react";
import "./css/ToDoCSS.scss"
import ToDoList from "./ToDoList";
import ToDoInsert from "./ToDoInsert";

const ToDoMain = () => {
    return (
        <div className="ToDoMain">
            <ToDoList/>
            <ToDoInsert/>
        </div>
    );
}

export default ToDoMain;