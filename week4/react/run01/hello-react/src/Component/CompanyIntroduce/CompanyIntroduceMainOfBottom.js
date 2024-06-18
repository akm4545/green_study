import React from "react";

const CompanyIntroduceMainOfBottom = ({userName}) => {
    let imgSrc = "/img/" + userName + ".jpeg";
    return (
        <div style={{marginTop:'10px', textAlign:'center'}}>
            {userName !== '' ? <img src={imgSrc} alt={userName}/> : ''}
        </div>
    );
}

export default CompanyIntroduceMainOfBottom;