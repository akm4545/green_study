const { createStore } = require("redux");

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 생성 함수
const toggleSwitch = () => ({type : TOGGLE_SWITCH});
const increase = difference => ({type : INCREASE, difference});
const decrease = () => ({type : DECREASE});

const initialState = {
    toggle: false,
    counter: 0
}

// 리듀서
function reducer(state = initialState, action){
    switch(action.type){
        case TOGGLE_SWITCH:
            return{
                ...state,
                toggle: !state.toggle
            }
        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference
            }
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            }
        default:
            return state;
    }
}

// 스토어
const store = createStore(reducer);

const render = () => {
    const state = store.getState();

    if(state.toggle){
        divToggle.classList.add("active");
    } else {
        divToggle.classList.remove("active");
    }

    counter.innerText = state.counter;
}

render();

// 구독
store.subscribe(render);

divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
}

btnIncrease.onclick = () => {
    store.dispatch(increase(1));
}

btnDecrease.onclick = () => {
    store.dispatch(decrease());
}