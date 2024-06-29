<!DOCTYPE html>
<html>
    <body>
        <div id="root">
            여기
        </div>
    </body>
</html>
<script src="dsadasd" />

script

const api = async () => {
    let data = await fetch('dsadsad/dsada');
    data = data.json();

    return data;
} 

let root = document.getElementbyId("root");

data.forEach((board) => {
    let boardDiv = document.createElement("div");

    boardDiv.innerText = board.content;
    boardDiv.id = board.idx;

    boardDiv.style.courser = "pointer";

    boardDiv.addEventListner("onclick", (e) => {
        window.location.href = 'dsadasdasd'
        // 페이지 이동 코드 
    })

    root.appendChild(boardDiv);
}) 

//리액트
const board = ({ idx, content}) => {
    let hendleClick = () => {
        window.location.href = 'dsadasda'
    }

    return <>
        <div
            idx={idx}
            onClikc={() => hendleClick()}
        >
            {content}
        </div>
    </>
}

