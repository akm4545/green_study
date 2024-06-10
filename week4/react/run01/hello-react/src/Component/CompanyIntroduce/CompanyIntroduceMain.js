import React from "react";
import CompanyIntroduceMainOfTop from "./CompanyIntroduceMainOfTop";
import CompanyIntroduceMainOfMiddle from "./CompanyIntroduceMainOfMiddle";
import CompanyIntroduceMainOfBottom from "./CompanyIntroduceMainOfBottom";

const mainStyle = {
    width: '800px',
    padding: '30px'
}

const subStyle = {
    border: 'solid 2px',
    marginBottom: '10px',
    padding: '10px',
    height: 'auto'
}

const CompanyIntroduceMain = () => {
    return (
        <div style={mainStyle}>
            <div style={subStyle}>
                <CompanyIntroduceMainOfTop name={'JMW'}>
                    <child>복지 : 좋음</child>
                    <child>연봉 : 동종업계 최대</child>
                    <child>일 : 많음</child>
                    <child>미래 : 밝음</child>
                    {/* {
                        {
                            a:'복지 : 좋음',
                            b:'연봉 : 동종업계 최대',
                            c:'일 : 많음',
                            d:'미래 : 밝음'
                        }
                    } */}
                </CompanyIntroduceMainOfTop>
            </div>

            <div style={subStyle}>
                <CompanyIntroduceMainOfMiddle>

                </CompanyIntroduceMainOfMiddle>
            </div>
            
            <div style={subStyle}>
                <CompanyIntroduceMainOfBottom>

                </CompanyIntroduceMainOfBottom>
            </div>
        </div>
    )
}

export default CompanyIntroduceMain;