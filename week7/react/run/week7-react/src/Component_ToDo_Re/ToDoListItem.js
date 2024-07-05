import "./css/ToDoCSS.scss"
import React, { useCallback, useState } from "react";

const ToDoListItem = ({item, onDblclick, onDelete, onUpdateForm, onUpdate}) => {
    const {id, title, content, dblClickFlag, updateFormFlag} = item;
    const [inputForm, setInputForm] = useState({
        in_title : title,
        in_content : content
    });
    const {in_title , in_content} = inputForm;

    const onChange = useCallback(
        e => {
            const nextInputForm = {
                ...inputForm,
                [e.target.name] : e.target.value
            }
            setInputForm(nextInputForm);
        },[inputForm]
    );

    return (
        <div className="ToDoListItem" id={id} onDoubleClick={() => onDblclick(id)}>
            {
                updateFormFlag ? 
                <>
                    <input 
                        type="text" 
                        name="in_title" 
                        value={in_title}  
                        placeholder="제목을 입력하세요" 
                        onChange={onChange}
                    />
                    <hr/>
                    <textarea 
                        name="in_content" 
                        rows={3} 
                        value={in_content} 
                        placeholder="내용을 입력하세요"
                        onChange={onChange}
                    >
                    </textarea>
                </> :
                 <>
                    <div className="div01">제목 : {title}</div>
                    <hr/>
                    <div className="div02">내용 : {content}</div>
                </>
            }
            {
                dblClickFlag ? 
                <>
                    <button className="deleteButton" onClick={() => onDelete(id)}>삭제</button>
                    {
                        updateFormFlag ? 
                        <>
                            <button className="updateButton" onClick={() => onUpdate(id, in_title, in_content)}>수정완료</button>
                        </> :
                        <>
                            <button className="updateButton" onClick={() => onUpdateForm(id)}>수정</button>
                        </>
                    }
                </> : <></>
            }
        </div>
    );
}

export default React.memo(ToDoListItem);