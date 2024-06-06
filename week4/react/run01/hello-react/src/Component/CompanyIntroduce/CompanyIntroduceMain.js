import React from "react";


const CompanyIntroduceMain = () => {
    const mainStyle = {
        width: '800px',
        padding: '30px'
    }

    const subStyle = {
        border: 'solid 2px',
        marginBottom: '10px',
        height: '200px'
    }
    
    return (
        <div style={mainStyle}>
            <div style={subStyle}>top</div>
            <div style={subStyle}>middle</div>
            <div style={subStyle}>bottom</div>
        </div>
    )
}

export default CompanyIntroduceMain;