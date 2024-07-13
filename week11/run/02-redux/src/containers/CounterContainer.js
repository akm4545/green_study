import Counter from "../components/Counter";
import { connect } from "react-redux";
import { decrease, increase } from "../modules/counter";
import { bindActionCreators } from "redux"; // 더 간결하게 액셔

const CounterContainer = ({number, increase, decrease}) => {
    return (
        <Counter
            number={number}
            onIncrease={increase}
            onDecrease={decrease}
        />
    );
}

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
export default connect(
                        state => ({
                            number: state.counter.number
                        }),
                         
                        // dispatch => ({
                        //     increase: () => {
                        //         dispatch(increase())
                        //     },
                        //     decrease: () => {
                        //         dispatch(decrease())
                        //     }
                        // })

                        // dispatch => bindActionCreators({
                        //     increase,
                        //     decrease
                        // }, dispatch)

                        {
                            increase,
                            decrease
                        }
                )
                (CounterContainer);