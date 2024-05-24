const user = {
    envMan: {
        //apiDomain:"http://localhost:8000/",
        apiDomain:"/",
    },

    requestMan: {
        userList: async () => {
            let response = await fetch(`${user.envMan.apiDomain}user/list`, {method: 'GET'});
            response = await response.json();
            return response;
        },

        userCreate: async (dtoData) => {
            let response = await fetch(`${user.envMan.apiDomain}user`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dtoData)
            });
            response = await response.json();
            return response;
        },

        userDetail: async  (key) => {
            let response = await fetch(`${user.envMan.apiDomain}user/` + key, {method: 'GET'});
            response = await response.json();
            return response;
        },

        userDelete: async (key) => {
            let response = await fetch(`${user.envMan.apiDomain}user/` + key, {method: 'DELETE'});
            response = await response.json();
            return response;
        },

        userUpdate: async (dtoData, key) => {
            let response = await fetch(`${user.envMan.apiDomain}user/` + key, {
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
        userList: ({userMapperDtoList : data}) => {
            let root = document.getElementById("root");
            let div = document.createElement("div");
            let userCreateFormMoveButton = document.createElement("button");
            userCreateFormMoveButton.innerText = "등록";
            userCreateFormMoveButton.style.backgroundColor = "green";
            userCreateFormMoveButton.style.color = "white";
            user.eventMan.userCreateFormMoveButtonClickHandler(userCreateFormMoveButton);
            div.appendChild(userCreateFormMoveButton);
            root.appendChild(div);

            let userTable = document.createElement("table");
            userTable.style.width = "200px";
            userTable.style.border = "1px solid";

            data.map((userDto, index) => {
                let tr = document.createElement("tr");
                tr.style.border = "1px solid";
                tr.style.cursor = "pointer";

                let keyArray = Object.keys(userDto);

                keyArray.map(key => {
                    let td = document.createElement("td");
                    td.style.border = "1px solid";
                    let userDetailData = userDto[key];

                    td.innerText = userDetailData;

                    key === "userSeq" ? tr.dataset.key = userDto[key] : null;
                    tr.appendChild(td);
                })
                userTable.appendChild(tr);

                user.eventMan.userListClickHandler(tr);
            })
            root.appendChild(userTable);
        },

        userCreateForm: (userSeq) => {
            let dtoTitleArr = ["아이디", "비밀번호", "인증타입"];
            let dtoIdNameArr = ["userId", "userPassword", "userAuthType"];
            let root = document.getElementById("root")
            let userTable = document.createElement("table");
            userTable.style.width = "200px";
            userTable.style.border = "1px solid";

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
                userTable.appendChild(tr);
            });
            root.appendChild(userTable);

            let buttonDiv = document.createElement("div");
            let userCreateButton = document.createElement("button");
            userCreateButton.innerText = "등록";
            userCreateButton.style.color = "white";
            userCreateButton.style.backgroundColor = "green";
            user.eventMan.userCreateButtonClickHandler(userCreateButton);
            buttonDiv.appendChild(userCreateButton);

            let listMoveButton = document.createElement("button");
            listMoveButton.innerText = "목록";
            user.eventMan.listMoveButtonClickHandler(listMoveButton);
            buttonDiv.appendChild(listMoveButton);

            root.appendChild(buttonDiv);
        },

        userDetail: ({userId , userPassword , userAuthType}, key) => {
            let dtoTitleArr = ["아이디", "비밀번호", "인증타입"];
            let dtoDataArr = [userId, userPassword, userAuthType];
            let root = document.getElementById("root")
            let userTable = document.createElement("table");
            userTable.style.width = "200px";
            userTable.style.border = "1px solid";

            dtoTitleArr.forEach((titleItem, index) => {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                tr.style.border = "1px solid";
                td.style.border = "1px solid";
                td.innerText = titleItem + " : " + dtoDataArr[index];
                tr.appendChild(td);
                userTable.appendChild(tr);
            });
            root.appendChild(userTable);

            let buttonDiv = document.createElement("div");
            let updateFormMoveButton = document.createElement("button");
            updateFormMoveButton.innerText = "수정화면";
            updateFormMoveButton.value = key;
            updateFormMoveButton.style.color = "white";
            updateFormMoveButton.style.backgroundColor = "blue";
            user.eventMan.updateFormMoveButtonClickHandler(updateFormMoveButton);
            buttonDiv.appendChild(updateFormMoveButton);

            let listMoveButton = document.createElement("button");
            listMoveButton.innerText = "목록";
            user.eventMan.listMoveButtonClickHandler(listMoveButton);
            buttonDiv.appendChild(listMoveButton);

            let deleteButton = document.createElement("button");
            deleteButton.innerText = "삭제";
            deleteButton.style.backgroundColor = "red";
            deleteButton.value = key;
            user.eventMan.deleteButtonClickHandler(deleteButton);
            buttonDiv.appendChild(deleteButton);

            root.appendChild(buttonDiv);
        },

        userUpdateForm:  ({userId , userPassword , userAuthType}, key) => {
            let dtoTitleArr = ["아이디", "비밀번호", "인증타입"];
            let dtoDataArr = [userId, userPassword, userAuthType];
            let dtoIdNameArr = ["userId", "userPassword", "userAuthType"];
            let root = document.getElementById("root")
            let userTable = document.createElement("table");
            userTable.style.width = "200px";
            userTable.style.border = "1px solid";

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

                td.appendChild(input);

                tr.appendChild(td);
                userTable.appendChild(tr);
            });
            root.appendChild(userTable);

            let buttonDiv = document.createElement("div");
            let userUpdateButton = document.createElement("button");
            userUpdateButton.innerText = "수정처리";
            userUpdateButton.value = key;
            userUpdateButton.style.color = "white";
            userUpdateButton.style.backgroundColor = "blue";
            user.eventMan.userUpdateButtonClickHandler(userUpdateButton);
            buttonDiv.appendChild(userUpdateButton);

            let listMoveButton = document.createElement("button");
            listMoveButton.innerText = "목록";
            user.eventMan.listMoveButtonClickHandler(listMoveButton);
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
        userListClickHandler: (tr) => {
            tr.addEventListener("click", () => {
                user.funcMan.nodeClean();
                user.userDetail(tr.dataset.key);
            });
        },

        userCreateFormMoveButtonClickHandler:(button) => {
            button.addEventListener("click", () => {
                let userSeq = 1;
                user.funcMan.nodeClean();
                user.viewMan.userCreateForm(userSeq);
            })
        },

        userCreateButtonClickHandler:(button) => {
            button.addEventListener("click", () => {
                let userId = document.getElementById("userId").value;
                let userPassword = document.getElementById("userPassword").value;
                let userAuthType = document.getElementById("userAuthType").value;
                if(userId == ""){
                    alert("아이디가 비어있습니다");
                    document.getElementById("userId").focus();
                    return false;
                }
                if(userPassword == ""){
                    alert("비밀번호가 비어있습니다");
                    document.getElementById("userPassword").focus();
                    return false;
                }
                if(userAuthType == ""){
                    alert("인증타입이 비어있습니다");
                    document.getElementById("userAuthType").focus();
                    return false;
                }
                if(confirm("등록하시겠습니까?")){
                    let dtoData = {
                        userId: userId,
                        userPassword: userPassword,
                        userAuthType: userAuthType
                    };
                    user.userCreate(dtoData);
                }
            })
        },

        listMoveButtonClickHandler: (button) => {
            button.addEventListener("click", () => {
                user.funcMan.nodeClean();
                user.userList();
            });
        },

        deleteButtonClickHandler: (button) => {
            button.addEventListener("click", () => {
                if(confirm("삭제하시겠습니까?")){
                    user.userDelete(button.value);
                }
            });
        },

        updateFormMoveButtonClickHandler: (button) => {
            button.addEventListener("click", () => {
                user.funcMan.nodeClean();
                user.userUpdateForm(button.value);
            });
        },

        userUpdateButtonClickHandler: (button) => {
            button.addEventListener("click", () => {
                if(confirm("수정 하시겠습니까?")){
                    let userId = document.getElementById("userId").value;
                    let userPassword = document.getElementById("userPassword").value;
                    let userAuthType = document.getElementById("userAuthType").value;
                    let dtoData = {
                        userId: userId,
                        userPassword: userPassword,
                        userAuthType: userAuthType
                    };
                    user.funcMan.nodeClean();
                    user.userUpdate(dtoData, button.value);
                }
            });
        },
    },

    userList: async () => {
        let data = await user.requestMan.userList();
        user.viewMan.userList(data);
    },

    userCreate: async (dtoData) => {
        let data = await user.requestMan.userCreate(dtoData);
        let resultCode = data.userSeq;
        alert(resultCode != null && resultCode > 0 ? "정상처리 되었습니다" : "실패했습니다");
        user.funcMan.nodeClean();
        user.userList();
    },

    userDetail: async (key) => {
        let data = await user.requestMan.userDetail(key);
        user.viewMan.userDetail(data, key);
    },

    userDelete: async (key) => {
        let data = await user.requestMan.userDelete(key);
        let resultCode = data.resultCode;
        alert(resultCode == "SUCCESS" ? "정상처리 되었습니다" : "실패했습니다");
        user.funcMan.nodeClean();
        user.userList();
    },

    userUpdateForm: async (key) => {
        let data = await user.requestMan.userDetail(key);
        user.viewMan.userUpdateForm(data, key);
    },

    userUpdate: async (dtoData, key) => {
        let data = await user.requestMan.userUpdate(dtoData, key);
        let resultCode = data.resultCode;
        alert(resultCode == "SUCCESS" ? "정상처리 되었습니다" : "실패했습니다");
        if(resultCode == "SUCCESS"){
            user.userDetail(key);
        } else {
            user.userUpdateForm(key);
        }
    },
}