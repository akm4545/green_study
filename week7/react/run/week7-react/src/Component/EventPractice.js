import React, { Component } from "react";

class EventPractice extends Component {

    state = {
        message : ''
    }

    constructor(props) {
        super(props)

        // 멤버 변수 = 우리가 선언했던 함수.bind(EventPractice)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    //this 의 관계 끊어져버린다
    handleChange(e){
        //코드상으로 보면 this = EventPracitce
        //바인딩 x
        //이벤트 등록 과정에서 this = undefined
        //this = undeFined setState x
        this.setState({
            message : e.target.value
        })
    }

    handleClick(){
        alert(this.state.message)
        this.setState({
            message: ''
        })
    }

    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type="text"
                    name="message"
                    placeholder="아무거나 입력하세요"
                    value={this.state.message}
                    onChange={this.handleChange
                        //e => 기존 DOM 이벤트 객체를 한번 감싼 래퍼 객체
                        //HTML 이벤트를 리액트 이벤트로 한번 감싸서 핸들링한다
                        // (e) => {
                        //     this.setState({
                        //         message : e.target.value
                        //     })
                        // }
                    }
                />
                <button
                    onClick={this.handleClick
                        // () => {
                        //     alert(this.state.message)
                        //     this.setState({
                        //         message: ''
                        //     })
                        // }
                    }
                >확인</button>
            </div>
        )
    }
}

export default EventPractice;