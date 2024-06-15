import React, { Component } from "react";

class EventPractice03 extends Component {
    
    state = {
        message : '',
        username : ''
    }

    //this 의 관계 끊어져버린다
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleClick = () => {
        alert(this.state.message + " / " + this.state.username)
        this.setState({
            message: '',
            username: ''
        })
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.handleClick();
        }
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
                    onKeyPress={this.handleKeyPress}
                />
                <input 
                    type="text"
                    name="username"
                    placeholder="아무거나 입력하세요"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <button
                    onClick={this.handleClick}
                >확인</button>
            </div>
        )
    }
}

export default EventPractice03;