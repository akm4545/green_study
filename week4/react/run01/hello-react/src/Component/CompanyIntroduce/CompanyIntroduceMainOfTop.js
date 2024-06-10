import React from "react";

const CompanyIntroduceMainOfTop = ({name, children}) => {
    document.title = name + " 회사소개";
    return (
        <div>
            <h1 style={{textAlign : 'center'}}>{name} 회사소개</h1>
            <hr/>
            {
                children.map(item => (<p>{item}</p>))
            }
        </div>
    );
}

export default CompanyIntroduceMainOfTop;