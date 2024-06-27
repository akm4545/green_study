import {useState, useEffect} from "react";

const Info = () => {
    const [name, setName] = useState('');
    const [nickname, setNicname] = useState('');

    //1
    // useEffect(() => {
    //     console.log("렌더링이 완료되었습니다");
    //     console.log({
    //         name,
    //         nickname
    //     });
    // }, []); // 처음실행될때 한번만 실행되게 하고싶으면 빈배열을 넣는다 [] 변화를 감지할값
    
    //2
    // useEffect(() => {
    //     console.log({name});
    // }, [name, nickname]);

    //3
    // useEffect(() => {
    //     console.log("effect");
    //     return () => {
    //         console.log("cleanUp");
    //     }
    // }, [name]);
    
    //4 언마운트
    useEffect(() => {
        return () => {
            console.log("cleanUp");
        }
    }, []);


    const onChangeName = e => {
        setName(e.target.value)
    }

    const onChangeNickname = e => {
        setNicname(e.target.value)
    }

    return (
        <div>
            <div>
                <input value={name} onChange={onChangeName}/>
                <input value={nickname} onChange={onChangeNickname}/>
            </div>
            <div>
                <b>이름 : </b>{name}
            </div>
            <div>
                <b>닉네임 : </b>{nickname}
            </div>
        </div>
    )
}

export default Info;