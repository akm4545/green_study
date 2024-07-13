const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

//액션생성함수
export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});

//초기값
const initialState = {
    number: 0
}

//리듀서
function counter(state = initialState, action){
    switch(action.type){
        case INCREASE:
            return {
                number: state.number + 1
            }
        case DECREASE:
            return {
                number: state.number - 1
            }
        default:
            return state
    }
}

export default counter;
