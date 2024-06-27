import React, {useState, useMemo, useCallback, useRef} from "react";

const getAverage = numbers => {
    console.log('평균값 계산 중...');
    if(numbers.length === 0){
        return 0;
    }

    const sum = numbers.reduce((a, b) => a + b);

    return sum / numbers.length
}

const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    // useCallBack 을 사용하지 않은 예
    // const onChange = e => {
    //     setNumber(e.target.value);
    // }

    // const onInsert = e => {
    //     const nextList = list.concat(parseInt(number));

    //     setList(nextList);
    //     setNumber('');
    // }

    // useCallBack 을 사용하는 이유 - 렌더링 될때마다 새로 생성되지 않게 하기 위한 최적화 기능(함수)
    const onChange = useCallback(e => {
        setNumber(e.target.value);
    }, []) 

    const onInsert = useCallback(e => {
        const nextList = list.concat(parseInt(number));

        setList(nextList);
        setNumber('');

        // 2 useRef 
        inputE1.current.focus();

    }, [number, list])

    //useMemo 를 사용하는 이유 - list(값) 를 비교하여 변화가 있을때만 실행하기 위한 최적화 기능(함수)
    const avg = useMemo(() => getAverage(list), [list]);

    // 1 useRef 
    const inputE1 = useRef(null);

    return (
        <div>
            {/* 3 useRef */}
            <input value={number} onChange={onChange} ref={inputE1} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                {/* <b>평균값 : </b> {getAverage(list)} */}
                <b>평균값 : </b> {avg}
            </div>
        </div>
    )
}

export default Average