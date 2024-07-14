import { createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = "todos/CHANGE_INPUT";
const INSERT = "todos/INSERT";
const TOGGLE = "todos/TOGGLE";
const REMOVE = "todos/REMOVE";

//액션생성함수
// 1번
// export const changeInput = input => ({
//     type: CHANGE_INPUT,
//     input
// })

// let id = 3
// export const insert = text => ({
//     type: INSERT,
//     todo: {
//         id: id++,
//         text,
//         done: false
//     }
// })

// export const toggle = id => ({
//     type: TOGGLE,
//     id
// })

// export const remove = id => ({
//     type: REMOVE,
//     id
// })


// 2번 리팩토링
let id = 3;
export const changeInput = createAction(CHANGE_INPUT, input => input);  // type:CHANGE_INPUT  payload : input
//export const changeInput = createAction(CHANGE_INPUT);//생략은 가능
export const insert = createAction(INSERT, text => ({
    id: id++,
    text,
    done: false
}));
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);


//초기값
const initialState = {
    input: '',
    todos: [
        {
            id: 1,
            text: '리덕스 기초 배우기',
            done: true
        },
        {
            id: 2,
            text: '리액트와 리덕스 사용하기',
            done: false
        }
    ]
}

//리듀서

//1번
// function todos(state = initialState, action){
//     switch(action.type){
//         case CHANGE_INPUT:
//             return {
//                 ...state,
//                 input: action.input
//             }
//         case INSERT:
//             return {
//                 ...state,
//                 todos: state.todos.concat(action.todo)
//             }
//         case TOGGLE:
//             return {
//                 ...state,
//                 todos: state.todos.map(todo => (
//                     todo.id === action.id ? {...todo, done: !todo.done} : todo
//                 ))
//             }
//         case REMOVE:
//             return {
//                 ...state,
//                 todos: state.todos.filter(todo => todo.id !== action.id)
//             }
//         default:
//             return  state;
//     }   
// }

// 2번 리팩토링
const todos = handleActions({
    [CHANGE_INPUT] : (state, {payload: input}) => ({...state, input: input}),
    [INSERT] : (state, {payload: todo}) => ({
        ...state,
        todos : state.todos.concat(todo)
    }),
    [TOGGLE] : (state, {payload: id}) => ({
        ...state,
        todos : state.todos.map(todo => 
            todo.id === id ? {...todo, done: !todo.done} : todo
        )
    }),
    [REMOVE] : (state, {payload: id}) => ({
        ...state,
        todos : state.todos.filter(todo => todo.id !== id)
    }),
}, initialState)


export default todos;