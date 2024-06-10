import React from "react";

const MyButton = ({name, color}) => {
    return (
        <button style = {
                            {
                                width :'25%', 
                                backgroundColor:color,
                            }
                        }>{name}</button>
    )
}

const MyIntroduceText = () => {
    return (
        <div style={{marginTop:'10px', border:'solid 1px', padding:'10px'}}>
            소개글
        </div>
    )
}

const CompanyIntroduceMainOfMiddle = () => {
    return (
        <>
            <div>
                <MyButton name="사원1" color="lightpink"></MyButton>
                <MyButton name="사원2" color="skyblue"></MyButton>
                <MyButton name="사원3" color="lightgreen"></MyButton>
                <MyButton name="사원4" color="yellow"></MyButton>
            </div>
            <div>
               <MyIntroduceText></MyIntroduceText>
            </div>
        </>
    );
}

export default CompanyIntroduceMainOfMiddle;