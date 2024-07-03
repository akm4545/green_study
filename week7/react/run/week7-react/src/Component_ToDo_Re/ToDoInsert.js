import React from "react";
import "./css/ToDoCSS.scss"

const ToDoInsert = () => {
    return (
        <div className="ToDoInsert">
            <div className="ToDoInsertDiv">
                <input
                    type="text"
                    name="title"
                    placeholder="제목을 입력해주세요" 
                    // onChange={onChange}
                    // value={title}
                />
                {/* <button onClick={onClick}>입력</button> */}
                <button>입력</button>
            </div>
            <div className="ToDoTextAreaDiv">
                <textarea
                        name="content"
                        rows={5} 
                        placeholder="내용을 입력해주세요"
                        // onChange={onChange}
                        // value={content}
                >
                </textarea>
            </div>
        </div>
    );
}

export default ToDoInsert;