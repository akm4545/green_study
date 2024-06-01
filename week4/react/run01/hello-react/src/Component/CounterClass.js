import React, { Component } from 'react';

class CounterClass extends Component{
    // 구
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         number: 0,
    //         fixedNumber: 0
    //     }
    // }

    //위에 것을 간결하게
    state = {
        number: 0,
        fixedNumber: 0
    }

    render(){
        const { number, fixedNumber } = this.state;

        return (
            <div>
                <h1>{number}</h1>
                <h1>바뀌지 않는 값 : {fixedNumber}</h1>
                <button 
                    onClick={() => {
                        // 1번
                        // this.setState({number : number + 1})
                        // this.setState({number : number + 1})
                        
                        // 2번
                        // this.setState(prevState => {
                        //     return {
                        //         number: prevState.number + 1
                        //     }
                        // })
                        // this.setState(prevState => {
                        //     return {
                        //         number: prevState.number + 1
                        //     }
                        // })
                        
                        // 3번
                        // return 값을 괄호로 묶어주면 바로 리턴된다
                        // this.setState(prevState => ({number: prevState.number + 1}))
                        // this.setState(prevState => ({number: prevState.number + 1}))

                        // 4번 콜백
                        this.setState(
                            {number: number + 1},
                            () => {alert("콜백 setState후 작업")}
                        )
                    }}
                >
                    +1
                </button>
                <button 
                    onClick={() => {
                        this.setState({number : number - 1})
                    }}
                >
                    -1
                </button>
            </div>
        )
    }
}

export default CounterClass;