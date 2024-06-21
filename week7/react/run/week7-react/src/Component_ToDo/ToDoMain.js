import React, {useState} from "react";


const ToDoMain = () => {
    
    const [inputForm, setInputForm] = useState({
        title : '',
        content : '',
    });
    
    const {title, content} = inputForm;

    const onChange = e => {
        const nextInputForm = {
            ...inputForm,
            [e.target.name] : e.target.value
        }
        setInputForm(nextInputForm);
    }

    const onClick = () => {
        addList(title, content);
        setInputForm({
            title : '',
            content : ''
        });
    }

    const addList = (in_title, in_content) => {
        let todoList = document.getElementById("todoList");
        let div01 = document.createElement("div");
        let div02 = document.createElement("div");
        let div03 = document.createElement("div");
        let hr = document.createElement("hr");
        let updateButton = document.createElement("button");
        let deleteButton = document.createElement("button");

        div01.style.marginBottom = '10px';
        div01.style.border = '1px solid';
        div01.style.cursor = 'pointer';

        div02.innerHTML = in_title;
        div03.innerHTML = in_content;

        updateButton.value = "update";
        updateButton.innerText = "수정";
        updateButton.style.backgroundColor = 'blue';
        updateButton.style.color = 'white';
        updateButton.style.display = 'none';
        updateButton.style.float = 'right';

        deleteButton.value = "delete";
        deleteButton.innerText = "삭제";
        deleteButton.style.backgroundColor = 'red'
        deleteButton.style.color = 'white'
        deleteButton.style.display = 'none';
        deleteButton.style.float = 'right';

        div01.appendChild(div02);
        div01.appendChild(hr);
        div01.appendChild(div03);
        div01.appendChild(deleteButton);
        div01.appendChild(updateButton);

        div01.addEventListener('dblclick', () => {
           let buttons = div01.getElementsByTagName("button");
           for(let ele of buttons){
                let displayStr = ele.style.display;
                if(displayStr === 'none'){
                    ele.style.display = 'block';
                } else {
                    ele.style.display = 'none';
                }
           }
        });

        deleteButton.addEventListener('click', () => {
            // eslint-disable-next-line no-restricted-globals
            if(confirm("Are wants Delte?")){
                div01.remove();
            }
        });

        updateButton.addEventListener('click', () => {
            let btnText = updateButton.innerText;
            if(btnText === '수정'){//수정폼 활성화
                let title = div02.innerText;
                let content = div03.innerText;
                div02.innerText = "";
                div03.innerText = "";
                
                let inputTitle = document.createElement("input");
                let inputContent = document.createElement("textarea");

                inputTitle.type = "text";
                inputTitle.style.width = "100%";
                inputTitle.value = title;

                inputContent.rows = 3;
                inputContent.style.width = "100%";
                inputContent.value = content;

                div02.appendChild(inputTitle);
                div03.appendChild(inputContent);

                updateButton.innerText = '수정완료';
            } else {//수정처리
                let eleTitle = div02.getElementsByTagName("input");
                let eleContent = div03.getElementsByTagName("textarea");
                let valueTitle = eleTitle[0].value;
                let valueContent = eleContent[0].value;
                div02.removeChild(eleTitle[0]);
                div03.removeChild(eleContent[0]);
                div02.innerText = valueTitle;
                div03.innerText = valueContent;
                updateButton.innerText = '수정';
            }
        })

        todoList.appendChild(div01);
    }

    return (
            <div style={{width:'500px', border:'solid 1px', margin:'20px'}}>
                <div id="todoList" style={{border:'solid 1px', margin:'10px', height:'200px', overflow:'scroll'}}>
                    
                </div>
                <div style={{border:'solid 1px', margin:'10px', padding:'10px'}}>
                    <div style={{marginBottom:'10px'}}>
                        <input
                            type="text"
                            name="title"
                            style={{width:'70%'}} 
                            placeholder="제목을 입력해주세요" 
                            onChange={onChange}
                            value={title}
                        />
                        <button style={{width:'20%', backgroundColor:'lightGreen'}} onClick={onClick}>입력</button>
                    </div>
                    <div>
                        <textarea
                                name="content"
                                style={{width:'100%'}} 
                                rows={5} 
                                placeholder="내용을 입력해주세요"
                                onChange={onChange}
                                value={content}
                        >
                        </textarea>
                    </div>
                </div>
            </div>
    );
}

export default ToDoMain;