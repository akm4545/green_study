import React from "react"
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import {useState, useRef, useCallback, useReducer} from 'react';

function createBulkTodos() {
  const array = [];

  for(let i=1; i<=2500; i++){
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checkd: false,
    });
  }
  return array;
}
// 이전 상태값, 액션
function todoReducer(todos, action){
  switch(action.type){
    case 'INSERT':
      return todos.concat(action.todo)
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id)
    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      )
    default:
      return todos;
  }
}

const App = () => {
  //const [todos, setTodos] = useState(createBulkTodos);
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  // 2번째 인자로 초기값 대신 undefined 로 설정해주고 , 3번째 인자로 초기값을 설정해주면 최초 렌더링시에만 초기값이 설정된다.

  const nextId = useRef(20001);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      }
      //setTodos(todos => todos.concat(todo));
      dispatch({type:'INSERT', todo});
      nextId.current += 1
    },[]);

  // update 방식을 정의한 함수를 매개변수로 전달해서
  // 리렌더링이 발생해도 함수를 새로 만들지 않음

  const onRemove = useCallback(
    id => {
      //setTodos(todos => todos.filter(todo => todo.id !== id));
      dispatch({type:'REMOVE', id});
    },
  []);
  
  const onToggle = useCallback(
    id => {
      // setTodos(todos =>
      //   todos.map(todo =>
      //     todo.id === id ? {...todo, checked: !todo.checked } : todo
      //   )
      // )
      dispatch({type:'TOGGLE', id});
    },[]);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  ) 
}
export default App;