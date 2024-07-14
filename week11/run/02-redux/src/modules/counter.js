import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

//액션생성함수
// 1번
// export const increase = () => ({type: INCREASE});
// export const decrease = () => ({type: DECREASE});

// 2번 리팩토링
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);


//초기값
const initialState = {
    number: 0
}

//리듀서

// 1번
// function counter(state = initialState, action){
//     switch(action.type){
//         case INCREASE:
//             return {
//                 number: state.number + 1
//             }
//         case DECREASE:
//             return {
//                 number: state.number - 1
//             }
//         default:
//             return state
//     }
// }

// 2번 리팩토링
const counter = handleActions(
    {
        [INCREASE] : (state, action) => ({number: state.number + 1}),
        [DECREASE] : (state, action) => ({number: state.number - 1}),
    },
    initialState
)

export default counter;
