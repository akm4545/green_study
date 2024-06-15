import React, {Component} from "react";

//라이프 사이클 메서드는 클래스형 컴포넌트에서만 사용할수있다

class LifeCycleSample extends Component{
    state = {
        number: 0,
        color: null,
    }

    myRef = null

    constructor(props){
        super(props)
        console.log('constructor')
    }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log('getDerivedStateFromProps')

        if(nextProps.color !== prevState.color){
            return {color : nextProps.color}
        }

        return null;
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate', nextProps, nextState);
        return nextState.number % 10 !== 4
    }

    componentWillUnmount(){
        console.log('componentWillUnmount')
    }

    handleClick = () => {
        this.setState({
            number: this.state.number + 1
        })
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('getSnapshotBeforeUpdate')
        if(prevProps.color !== this.props.color){
            return this.myRef.style.color
        }
        return null
    }

    componentDidUpdate(prevProps, prevState, snapShot){
        console.log('componentDidUpdate', prevProps, prevState)
        if(snapShot){
            console.log('업데이트되기 직전 색상 : ', snapShot)
        }
    }

    render(){
        console.log('render')

        const style = {
            color: this.props.color
        }

        return (
            <div>
                {this.props.missing.value}
                <h1
                    style={style}
                    ref={ref => this.myRef=ref}
                >
                    {this.state.number}
                </h1>
                <p>color : {this.state.color}</p>
                <button onClick={this.handleClick}>
                    더하기
                </button>
            </div>
        );
    }
}
export default LifeCycleSample