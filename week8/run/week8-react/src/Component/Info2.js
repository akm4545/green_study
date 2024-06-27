//import {useReducer} from "react";
import {useInputs} from "./useInputs";

// 1. useReducer
// function reducer(state, action){
//     return {
//         ...state,//스프레드 연산자, 불변성 유지를 위한 복사 개념
//         [action.name]: action.value
//     }
// }

const Info2 = () => {
    // 1. useReducer
    // const [state, dispatch] = useReducer(reducer, {
    //     name: '',
    //     nickname: ''
    // })
    
    const [state, onChange] = useInputs({
        name : '',
        nickname : ''
    })

    const {name, nickname} = state;

    // 1. useReducer
    // const onChange = e => {
    //     dispatch(e.target);
    // }

    return (
        <div>
            <div>
                <input value={name} onChange={onChange}/>
                <input value={nickname} onChange={onChange}/>
            </div>
            <div>
                <b>이름 : </b>{name}
            </div>
            <div>
                <b>닉네임 : </b>{nickname}
            </div>
        </div>
    )
}

export default Info2;