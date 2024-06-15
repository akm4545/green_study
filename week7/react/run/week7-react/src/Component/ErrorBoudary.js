import React, {Component} from "react";

//라이프 사이클 메서드는 클래스형 컴포넌트에서만 사용할수있다

class ErrorBoudary extends Component {
    state = {
        error : false
    }

    componentDidCatch(error, info){
        this.setState({
            error: true
        })
        console.log({error, info})
    }

    render(){
        const {children} = this.props;

        if(this.state.error){
            return <div>에러가 발생했습니다.</div>
        } 
        
        return children;
    }
}

export default ErrorBoudary
