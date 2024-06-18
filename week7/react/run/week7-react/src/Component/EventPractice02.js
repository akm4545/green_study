import React, { Component } from "react";

class EventPractice02 extends Component {
    
    state = {
        message : ''
    }

    //this 의 관계 끊어져버린다
    handleChange = (e) => {
        this.setState({
            message : e.target.value
        })
    }

    handleClick = () => {
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
                    onChange={this.handleChange}
                />
                <button
                    onClick={this.handleClick}
                >확인</button>
            </div>
        )
    }
}

export default EventPractice02;