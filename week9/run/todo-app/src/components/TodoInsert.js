import {MdAdd} from "react-icons/md"
import './TodoInsert.scss'
import {useState, useCallback} from 'react';


const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        e => {
            e.preventDefault();//이벤트 중지
            
            onInsert(value);
            setValue('');
        },
        [onInsert, value]
    );

    return (
        <form className="TodoInsert">
            <input 
                placeholder="할 일을 입력하세요"
                value={value}
                onChange={onChange}
            />
            <button 
                    type="submit"
                    // onSubmit={onSubmit}
                    onClick={onSubmit}
            >
                <MdAdd/>
            </button>
        </form>
    )
}

export default TodoInsert;