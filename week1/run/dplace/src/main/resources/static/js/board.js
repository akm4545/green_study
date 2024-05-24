const board = {
    envMan: {
        //apiDomain:"http://localhost:8000/",
        apiDomain:"/",
    },

    requestMan: {
        boardList: async () => {
            let response = await fetch(`${board.envMan.apiDomain}board/list`, {method: 'GET'});
            response = await response.json();
            return response;
        },

        boardCreate: async (dtoData) => {
            let response = await fetch(`${board.envMan.apiDomain}board`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dtoData)
            });
            response = await response.json();
            return response;
        },

        boardDetail: async  (key) => {
            let response = await fetch(`${board.envMan.apiDomain}board/` + key, {method: 'GET'});
            response = await response.json();
            return response;
        },

        boardDelete: async (key) => {
            let response = await fetch(`${board.envMan.apiDomain}board/` + key, {method: 'DELETE'});
            response = await response.json();
            return response;
        },

        boardUpdate: async (dtoData, key) => {
            let response = await fetch(`${board.envMan.apiDomain}board/` + key, {
                                                    method: 'PUT',
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify(dtoData)
                                                });
            response = await response.json();
            return response;
        },
    },

    viewMan: {
        boardList: ({boardMapperDtoList : data}) => {
            let root = document.getElementById("root");
            let div = document.createElement("div");
            let boardCreateFormMoveButton = document.createElement("button");
            boardCreateFormMoveButton.innerText = "등록";
            boardCreateFormMoveButton.style.backgroundColor = "green";
            boardCreateFormMoveButton.style.color = "white";
            board.eventMan.boardCreateFormMoveButtonClickHandler(boardCreateFormMoveButton);
            div.appendChild(boardCreateFormMoveButton);
            root.appendChild(div);

            let boardTable = document.createElement("table");
            boardTable.style.width = "200px";
            boardTable.style.border = "1px solid";

            data.map((boardDto, index) => {
                let tr = document.createElement("tr");
                tr.style.border = "1px solid";
                tr.style.cursor = "pointer";

                let keyArray = Object.keys(boardDto);

                keyArray.map(key => {
                    let td = document.createElement("td");
                    td.style.border = "1px solid";
                    let boardDetailData = boardDto[key];

                    td.innerText = boardDetailData;

                    key === "boardSeq" ? tr.dataset.key = boardDto[key] : null;
                    tr.appendChild(td);
                })
                boardTable.appendChild(tr);

                board.eventMan.boardListClickHandler(tr);
            })
            root.appendChild(boardTable);
        },

        boardCreateForm: (userSeq) => {
            let dtoTitleArr = ["제목", "내용", "사용자일련번호"];
            let dtoIdNameArr = ["boardTitle", "boardContent", "userSeq"];
            let root = document.getElementById("root")
            let boardTable = document.createElement("table");
            boardTable.style.width = "200px";
            boardTable.style.border = "1px solid";

            dtoTitleArr.forEach((titleItem, index) => {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                tr.style.border = "1px solid";
                td.style.border = "1px solid";
                td.innerText = titleItem + " : ";
                let input = document.createElement("input");
                input.type = "text";
                input.id = dtoIdNameArr[index];
                input.name = dtoIdNameArr[index];

                dtoIdNameArr[index] == "userSeq" ? input.value = userSeq : null;
                dtoIdNameArr[index] == "userSeq" ? input.disabled = true : input.disabled = false;

                td.appendChild(input);

                tr.appendChild(td);
                boardTable.appendChild(tr);
            });
            root.appendChild(boardTable);

            let buttonDiv = document.createElement("div");
            let boardCreateButton = document.createElement("button");
            boardCreateButton.innerText = "등록";
            boardCreateButton.style.color = "white";
            boardCreateButton.style.backgroundColor = "green";
            board.eventMan.boardCreateButtonClickHandler(boardCreateButton);
            buttonDiv.appendChild(boardCreateButton);

            let listMoveButton = document.createElement("button");
            listMoveButton.innerText = "목록";
            board.eventMan.listMoveButtonClickHandler(listMoveButton);
            buttonDiv.appendChild(listMoveButton);

            root.appendChild(buttonDiv);
        },

        boardDetail: ({boardTitle , boardContent , userSeq}, key) => {
            let dtoTitleArr = ["제목", "내용", "사용자일련번호"];
            let dtoDataArr = [boardTitle, boardContent, userSeq];
            let root = document.getElementById("root")
            let boardTable = document.createElement("table");
            boardTable.style.width = "200px";
            boardTable.style.border = "1px solid";

            dtoTitleArr.forEach((titleItem, index) => {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                tr.style.border = "1px solid";
                td.style.border = "1px solid";
                td.innerText = titleItem + " : " + dtoDataArr[index];
                tr.appendChild(td);
                boardTable.appendChild(tr);
            });
            root.appendChild(boardTable);

            let buttonDiv = document.createElement("div");
            let updateFormMoveButton = document.createElement("button");
            updateFormMoveButton.innerText = "수정화면";
            updateFormMoveButton.value = key;
            updateFormMoveButton.style.color = "white";
            updateFormMoveButton.style.backgroundColor = "blue";
            board.eventMan.updateFormMoveButtonClickHandler(updateFormMoveButton);
            buttonDiv.appendChild(updateFormMoveButton);

            let listMoveButton = document.createElement("button");
            listMoveButton.innerText = "목록";
            board.eventMan.listMoveButtonClickHandler(listMoveButton);
            buttonDiv.appendChild(listMoveButton);

            let deleteButton = document.createElement("button");
            deleteButton.innerText = "삭제";
            deleteButton.style.backgroundColor = "red";
            deleteButton.value = key;
            board.eventMan.deleteButtonClickHandler(deleteButton);
            buttonDiv.appendChild(deleteButton);

            root.appendChild(buttonDiv);
        },

        boardUpdateForm:  ({boardTitle , boardContent , userSeq}, key) => {
            let dtoTitleArr = ["제목", "내용", "사용자일련번호"];
            let dtoDataArr = [boardTitle, boardContent, userSeq];
            let dtoIdNameArr = ["boardTitle", "boardContent", "userSeq"];
            let root = document.getElementById("root")
            let boardTable = document.createElement("table");
            boardTable.style.width = "200px";
            boardTable.style.border = "1px solid";

            dtoTitleArr.forEach((titleItem, index) => {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                tr.style.border = "1px solid";
                td.style.border = "1px solid";
                td.innerText = titleItem + " : ";
                let input = document.createElement("input");
                input.type = "text";
                input.id = dtoIdNameArr[index];
                input.name = dtoIdNameArr[index];
                input.value = dtoDataArr[index];

                dtoIdNameArr[index] == "userSeq" ? input.disabled = true : input.disabled = false;

                td.appendChild(input);

                tr.appendChild(td);
                boardTable.appendChild(tr);
            });
            root.appendChild(boardTable);

            let buttonDiv = document.createElement("div");
            let boardUpdateButton = document.createElement("button");
            boardUpdateButton.innerText = "수정처리";
            boardUpdateButton.value = key;
            boardUpdateButton.style.color = "white";
            boardUpdateButton.style.backgroundColor = "blue";
            board.eventMan.boardUpdateButtonClickHandler(boardUpdateButton);
            buttonDiv.appendChild(boardUpdateButton);

            let listMoveButton = document.createElement("button");
            listMoveButton.innerText = "목록";
            board.eventMan.listMoveButtonClickHandler(listMoveButton);
            buttonDiv.appendChild(listMoveButton);

            root.appendChild(buttonDiv);
        }
    },

    funcMan: {
        nodeClean: () => {
            let root = document.getElementById("root");
            root.replaceChildren();
        }
    },

    eventMan: {
        boardListClickHandler: (tr) => {
            tr.addEventListener("click", () => {
                board.funcMan.nodeClean();
                board.boardDetail(tr.dataset.key);
            });
        },

        boardCreateFormMoveButtonClickHandler:(button) => {
            button.addEventListener("click", () => {
                let userSeq = 1;
                board.funcMan.nodeClean();
                board.viewMan.boardCreateForm(userSeq);
            })
        },

        boardCreateButtonClickHandler:(button) => {
            button.addEventListener("click", () => {
                let boardTitle = document.getElementById("boardTitle").value;
                let boardContent = document.getElementById("boardContent").value;
                let userSeq = document.getElementById("userSeq").value;
                if(boardTitle == ""){
                    alert("제목이 비어있습니다");
                    document.getElementById("boardTitle").focus();
                    return false;
                }
                if(boardContent == ""){
                    alert("내용이 비어있습니다");
                    document.getElementById("boardContent").focus();
                    return false;
                }
                if(confirm("등록하시겠습니까?")){
                    let dtoData = {
                        title: boardTitle,
                        content: boardContent,
                        userSeq: userSeq
                    };
                    board.boardCreate(dtoData);
                }
            })
        },

        listMoveButtonClickHandler: (button) => {
            button.addEventListener("click", () => {
                board.funcMan.nodeClean();
                board.boardList();
            });
        },

        deleteButtonClickHandler: (button) => {
            button.addEventListener("click", () => {
               if(confirm("삭제하시겠습니까?")){
                   board.boardDelete(button.value);
               }
            });
        },

        updateFormMoveButtonClickHandler: (button) => {
            button.addEventListener("click", () => {
                board.funcMan.nodeClean();
                board.boardUpdateForm(button.value);
            });
        },

        boardUpdateButtonClickHandler: (button) => {
            button.addEventListener("click", () => {
                if(confirm("수정 하시겠습니까?")){
                    let boardTitle = document.getElementById("boardTitle").value;
                    let boardContent = document.getElementById("boardContent").value;
                    let userSeq = document.getElementById("userSeq").value;
                    let dtoData = {
                        title: boardTitle,
                        content: boardContent,
                        userSeq: userSeq
                    };
                    board.funcMan.nodeClean();
                    board.boardUpdate(dtoData, button.value);
                }
            });
        },
    },

    boardList: async () => {
        let data = await board.requestMan.boardList();
        board.viewMan.boardList(data);
    },

    boardCreate: async (dtoData) => {
        let data = await board.requestMan.boardCreate(dtoData);
        let resultCode = data.boardSeq;
        alert(resultCode != null && resultCode > 0 ? "정상처리 되었습니다" : "실패했습니다");
        board.funcMan.nodeClean();
        board.boardList();
    },

    boardDetail: async (key) => {
        let data = await board.requestMan.boardDetail(key);
        board.viewMan.boardDetail(data, key);
    },

    boardDelete: async (key) => {
        let data = await board.requestMan.boardDelete(key);
        let resultCode = data.resultCode;
        alert(resultCode == "SUCCESS" ? "정상처리 되었습니다" : "실패했습니다");
        board.funcMan.nodeClean();
        board.boardList();
    },

    boardUpdateForm: async (key) => {
        let data = await board.requestMan.boardDetail(key);
        board.viewMan.boardUpdateForm(data, key);
    },

    boardUpdate: async (dtoData, key) => {
        let data = await board.requestMan.boardUpdate(dtoData, key);
        let resultCode = data.resultCode;
        alert(resultCode == "SUCCESS" ? "정상처리 되었습니다" : "실패했습니다");
        if(resultCode == "SUCCESS"){
            board.boardDetail(key);
        } else {
            board.boardUpdateForm(key);
        }
    },
}