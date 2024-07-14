import Counter from "../components/Counter";
import { connect } from "react-redux";
import { decrease, increase } from "../modules/counter";
import { bindActionCreators } from "redux"; // 더 간결하게 액셔
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

// 1번
// const CounterContainer = ({number, increase, decrease}) => {
    // return (
    //     <Counter
    //         number={number}
    //         onIncrease={increase}
    //         onDecrease={decrease}
    //     />
    // );
// }

// const mapStateToProps = state => ({
//     number: state.counter.number
// })

//dispatch 스토어의 내장함수
// const mapDispatchToProps = dispatch => ({
//     increase: () => {
//         dispatch(increase())
//     },
//     decrease: () => {
//         dispatch(decrease())
//     }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
// 
// export default connect(
//                         state => ({
//                             number: state.counter.number
//                         }),
                        
                        // 1번
                        // dispatch => ({
                        //     increase: () => {
                        //         dispatch(increase())
                        //     },
                        //     decrease: () => {
                        //         dispatch(decrease())
                        //     }
                        // })

                        // 2번
                        // dispatch => bindActionCreators({
                        //     increase,
                        //     decrease
                        // }, dispatch)

                        // 3번
                //         {
                //             increase,
                //             decrease
                //         }
                // )
                // (CounterContainer);

// 2번
const CounterContainer = () => {
    const number = useSelector(state => state.counter.number);
    const dispatch = useDispatch();
    const onIncrease = useCallback(()=>dispatch(increase()), [dispatch]);
    const onDecrease = useCallback(()=>dispatch(decrease()), [dispatch]);

    // store 직접 접근 할때 사용
    // const store = useStore()
    // store.dispathch({type:'SAMPLE_ACTION'}) // dispatch 액션을 발생
    // const sampleVal = store.getState();


    // 1번 최적화 전
    // return <Counter 
    //             number={number}
    //             onIncrease={()=>dispatch(increase())}
    //             onDecrease={()=>dispatch(decrease())}
    //        />
    
    // 2번 최적화 후
    return <Counter 
        number={number}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
    />
}

export default CounterContainer;