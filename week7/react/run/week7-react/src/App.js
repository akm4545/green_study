import React, { Component } from "react";
// import ValidationSample from "./Component/ValidationSample";
import ScrollBox from "./Component/ScrollBos";
import IterationSample from "./Component/IterationSample";
import IterationSample02 from "./Component/IterationSample02";
import LifeCycleSample from "./Component/LifeCycleSample";
import ErrorBoudary from "./Component/ErrorBoudary";
import ToDoMain from "./Component_ToDo/ToDoMain";

function getRandomColor(){
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

// const App = () => {
class App extends Component {
  state = {
    color : '#000000'
  }

  handleClick = () => {
    this.setState({
      color: getRandomColor()
    })
  }

  render(){
    return (
      //=================================================1
      // <EventPracitceFunctionComponent02/>
      // <ValidationSample/>
      
      //=================================================2
      // <div>
      //   <ScrollBox ref={(ref) => this.scrollBox=ref} />
      //   <button onClick={() => this.scrollBox.scrollToBottom()}>
      //     맨 밑으로
      //   </button>
      //   <button onClick={() => this.scrollBox.scrollToTop()}>
      //     맨 위로
      //   </button>
      // </div>

      //=================================================3
      // <div>
      //   <IterationSample02/>
      // </div>

      //=================================================4
      // <div>
      //   <button onClick={this.handleClick}>랜덤 색상</button>
      //   <ErrorBoudary>
      //     <LifeCycleSample color={this.state.color} />
      //   </ErrorBoudary>
      // </div>

      //=================================================5
      <>
        <ToDoMain/>
      </>
    )
  }
}

// ref = 리액트에서 dom 요소에 직접 접근할때만 사용

export default App;