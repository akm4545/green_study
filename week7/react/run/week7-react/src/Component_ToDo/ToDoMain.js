import React from "react";

const ToDoMain = () => {
    return (
            <div style={{width:'500px', border:'solid 1px', margin:'20px'}}>
                <div style={{border:'solid 1px', margin:'10px'}}>
                    리스트영역
                </div>
                <div style={{border:'solid 1px', margin:'10px', padding:'10px'}}>
                    <div style={{marginBottom:'10px'}}>
                        <input
                            type="text"
                            name="title"
                            style={{width:'70%'}} 
                            placeholder="제목을 입력해주세요" 
                        />
                        <button style={{width:'20%', backgroundColor:'lightGreen'}}>입력</button>
                    </div>
                    <div>
                        <textarea
                                name="content"
                                style={{width:'100%'}} 
                                rows={5} 
                                placeholder="내용을 입력해주세요"
                        >
                        </textarea>
                    </div>
                </div>
            </div>
    );
}

export default ToDoMain;