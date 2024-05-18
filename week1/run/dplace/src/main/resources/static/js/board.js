const board = {
    envMan: {
        apiDomain:"http://localhost:8000/",
    },

    requestMan: {
        boardList: async () => {
            let response = await fetch(`${board.envMan.apiDomain}board/list`)

            response = await response.json()

            return response
        },

        boardDetail: async  () => {

        }
    },

    viewMan: {
        boardList: ({boardMapperDtoList : data}) => {
            let root = document.getElementById("root")
            let boardTable = document.createElement("table");

            boardTable.style.borderStyle = "dashed";

            data.map((board, index) => {
                let tr = document.createElement("tr");
                tr.style.border = "1px";
                tr.style.cursor = "pointer";

                let keyArray = Object.keys(board);

                keyArray.map(key => {
                    let td = document.createElement("td");
                    let boardDetailData = board[key];

                    td.innerText = boardDetailData;

                    key === "boardSeq" ? tr.dataset.key = board[key] : null;
                    tr.appendChild(td);
                })
                boardTable.appendChild(tr);

                boardList.eventMan.boardListClickHandler(tr);
            })
            root.appendChild(boardTable)
        }
    },

    funcMan: {
        nodeClean: () => {
            let root = document.getElementById("root");
            let child =  root.children[0];
            root.removeChild(child);
        }
    },

    eventMan: {
        boardListClickHandler: (tr) => {
            tr.addEventListener("click", () => {
                boardList.funcMan.nodeClean();
            });
        }
    },

    boardList: async () => {
        let data = await boardList.requestMan.boardList()
        boardList.viewMan.boardList(data);
    },
}