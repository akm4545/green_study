import "./css/ToDoCSS.scss"
import React, {useCallback, useState} from "react";

const ToDoInsert = ({onInsert}) => {
    
    const [form, setForm] = useState({
        title : '',
        content : ''
    });

    const {title, content} = form;

    const onChange = useCallback(e => {
        const nextForm = {
            ...form,
            [e.target.name] : e.target.value
        }
        setForm(nextForm);
    },[form]);

    const onClick = useCallback(
        () => {
            onInsert(form);
            setForm({
                title : '',
                content : ''
            });
        }, [onInsert, form]
    );

    return (
        <div className="ToDoInsert">
            <div className="ToDoInsertDiv">
                <input
                    type="text"
                    name="title"
                    placeholder="제목을 입력해주세요" 
                    onChange={onChange}
                    value={title}
                />
                <button onClick={onClick}>입력</button>
            </div>
            <div className="ToDoTextAreaDiv">
                <textarea
                        name="content"
                        rows={5} 
                        placeholder="내용을 입력해주세요"
                        onChange={onChange}
                        value={content}
                >
                </textarea>
            </div>
        </div>
    );
}

export default React.memo(ToDoInsert);//부모가 랜더링되면 자식은 무조건 리랜더링 되기 때문이다.