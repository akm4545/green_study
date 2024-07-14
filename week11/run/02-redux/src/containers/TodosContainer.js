import { connect } from "react-redux"
import Todos from "../components/Todos"
import { changeInput, insert, remove, toggle,} from "../modules/todos"
import { useSelector, useDispatch } from "react-redux";
import React, { useCallback } from "react";

// 1번
// const TodosContainer = ({input, todos, changeInput, insert, toggle, remove
// }) => {
//     return (
//         <Todos 
//             input={input}
//             todos={todos}
//             onChangeInput={changeInput}
//             onInsert={insert}
//             onToggle={toggle}
//             onRemove={remove}
//         />
//     )
// }

// export default connect(
//     ({todos}) => ({
//         input: todos.input,
//         todos: todos.todos
//     }),
//     {
//         changeInput,
//         insert,
//         toggle,
//         remove
//     }
// )(TodosContainer);


// 2번 최적화
// const TodosContainer = () => {
//     const {input, todos} = useSelector(({todos}) => ({
//         input : todos.input,
//         todos : todos.todos
//     }));

//     const dispatch = useDispatch();

//     const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
//     const onInsert = useCallback(text => dispatch(insert(text)), [dispatch]);
//     const onToggle = useCallback(id => dispatch(toggle(id)), [dispatch]);
//     const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);

//     return (
//         <Todos 
//             input={input}
//             todos={todos}
//             onChangeInput={onChangeInput}
//             onInsert={onInsert}
//             onToggle={onToggle}
//             onRemove={onRemove}
//         />
//     );
// }
// export default TodosContainer;


// 3번 커스텀 훅을 이용한 최적화
import useActions from "../lib/useActions";
const TodosContainer = () => {
    const {input, todos} = useSelector(({todos}) => ({
        input : todos.input,
        todos : todos.todos
    }));

    const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
        [changeInput, insert, toggle, remove],
        []
    );

    return (
        <Todos 
            input={input}
            todos={todos}
            onChangeInput={onChangeInput}
            onInsert={onInsert}
            onToggle={onToggle}
            onRemove={onRemove}
        />
    );
}
export default React.memo(TodosContainer);

// hook x <> connect -> 부모 컴포넌트가 렌더링될때 값이 안바뀌면 자동으로 리렌더링을 방지
// hook 도 최적화 하고싶다면 React.memo 를 사용