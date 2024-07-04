import "./css/ToDoCSS.scss"
import ToDoList from "./ToDoList";
import ToDoInsert from "./ToDoInsert";
import React , {useCallback, useReducer, useRef} from "react";


function reducer(list, action){
    if(action.type === 'ADD'){
        return list.concat(action.newForm);
    }
}

const ToDoMain = () => {
    
    const [list, dispatch] = useReducer(reducer, []);

    const idx = useRef(1);

    const onInsert = useCallback((form) => {
            const {title, content} = form;
            const newForm = {
                id : idx.current,
                title : title,
                content : content
            }
            dispatch({type:'ADD', newForm});
            idx.current += 1;
        }, []
    );

    return (
        <div className="ToDoMain">
            <ToDoList list={list} />
            <ToDoInsert onInsert={onInsert}/>
        </div>
    );
}

export default ToDoMain;