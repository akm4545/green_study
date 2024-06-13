import React, { useState } from "react";
import CompanyIntroduceMainOfBottom from "./CompanyIntroduceMainOfBottom";

const CompanyIntroduceMainOfMiddle = () => {
    const [introduceText, setIntroduceText] = useState('소개글');
    const [userName, setUserName] = useState('');

    const MyButton = ({name, color, children}) => {
        return (
            <button style = {
                                {
                                    width :'25%', 
                                    backgroundColor:color,
                                }
                            } onClick={
                                        () => {
                                                setIntroduceText(children);
                                                setUserName(name);
                                        }
                                    }>{name}</button>
        )
    }
    
    const MyIntroduceText = () => {
        return (
            <div id="introduceText" style={{marginTop:'10px', border:'solid 1px', padding:'10px'}}>
                {introduceText}
            </div>
        )
    }

    return (
        <>
            <div>
                <MyButton name="사원1" color="lightpink">나는 사원1 입니다<br/>하이 하이</MyButton>
                <MyButton name="사원2" color="skyblue">나는 사원2 입니다<br/>반갑습니다</MyButton>
                <MyButton name="사원3" color="lightgreen">나는 사원3 입니다<br/>재미나네요</MyButton>
                <MyButton name="사원4" color="yellow">나는 사원4 입니다<br/>그렇군요</MyButton>
            </div>
            <div>
               <MyIntroduceText></MyIntroduceText>
            </div>
            <div>
                <CompanyIntroduceMainOfBottom userName={userName} />
            </div>
        </>
    );
}

export default CompanyIntroduceMainOfMiddle;