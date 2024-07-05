import "./css/ToDoCSS.scss"
import ToDoList from "./ToDoList";
import ToDoInsert from "./ToDoInsert";
import React , {useCallback, useMemo, useReducer, useRef} from "react";

function createList(){
    const array = [];
    return array;
}

function reducer(list, action){
    if(action.type === 'ADD'){
        return list.concat(action.newForm);
    }
    if(action.type === 'DBLCLICK'){
        return list.map((item) => 
            item.id === action.id ? {...item, dblClickFlag: !item.dblClickFlag } : item);
    }
    if(action.type === 'UPDATEFORM'){
        return list.map((item) => 
            item.id === action.id ? {...item, updateFormFlag: !item.updateFormFlag } : item);
    }
    if(action.type === 'UPDATE'){
        return list.map((item) => 
            item.id === action.id ? 
                                    {
                                        ...item, 
                                        updateFormFlag: !item.updateFormFlag,
                                        title: action.title,
                                        content: action.content 
                                    } : item);
    }
    if(action.type === 'DELETE'){
        if(window.confirm('정말 삭제하시겠습니까? ')){//엄격모드 해제,, 2번 실행됨
            return list.filter((item) => item.id !== action.id);
        } 
    }
    return list;
}

const ToDoMain = () => {
    
    const [list, dispatch] = useReducer(reducer, undefined, createList);

    const idx = useRef(1);

    const onInsert = useCallback(
        (form) => {
            const {title, content} = form;
            const newForm = {
                id : idx.current,
                title : title,
                content : content,
                dblClickFlag : false,
                updateFormFlag : false
            }
            dispatch({type:'ADD', newForm});
            idx.current += 1;
        }, []
    );

    const onDblclick = useCallback(
        (id) => {
            dispatch({type:'DBLCLICK', id});
        }, []
    );
    
    const onDelete = useCallback(
        (id) => {
            dispatch({type:'DELETE', id});
        }, []
    );

    const onUpdateForm = useCallback(
        (id) => {
            dispatch({type:'UPDATEFORM', id});
        }, []
    );
    
    const onUpdate = useCallback(
        (id, title, content) => {
            dispatch({type:'UPDATE', id, title, content});
        }, []
    );

    return (
        <div className="ToDoMain">
            <ToDoList 
                list={list} 
                onDblclick={onDblclick} 
                onDelete={onDelete} 
                onUpdateForm={onUpdateForm}
                onUpdate={onUpdate} 
            />
            <ToDoInsert onInsert={onInsert}/>
        </div>
    );
}

export default React.memo(ToDoMain);