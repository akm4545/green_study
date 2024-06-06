import logo from './logo.svg';
import './App.css';
import MyComponent from './Component/MyComponent';
import MyClassComponent from './Component/MyClassComponent';
import CounterClass from './Component/CounterClass';
import Say from './Component/Say';
import CompanyIntroduceMain from './Component/CompanyIntroduce/CompanyIntroduceMain';

// function App() {
//   const name = "리액트";
//   return <div className='react'>{name}</div>
// }

// const App = () => {
//   return <><MyComponent>
//     장현태
//   </MyComponent>
//   <hr/>
//   <MyClassComponent>
//     꼬미
//   </MyClassComponent>
//   <hr/>
//   <CounterClass />
//   <hr/>
//   <Say />
//   </>
// }

// 회사소개
function App(){
  return <CompanyIntroduceMain/>;
}


export default App;
