// 1번
// import { ColorConsumer } from "../contexts/color";

// const ColorBox = () => {
//     return (
//         // Function as a child 패턴 또는
//         // Render Props 패턴
//         <ColorConsumer>
//             {/* {(value) => ( */}
//             {({state}) => (
//                 <>
//                     <div
//                         style={{
//                             width: '64px',
//                             height: '64px',
//                             // background: value.state.color
//                             background: state.color
//                         }}
//                     />
//                     <div
//                         style={{
//                             width: '64px',
//                             height: '64px',
//                             // background: value.state.subcolor
//                             background: state.subcolor
//                         }}
//                     />
//                 </>
//             )}
//         </ColorConsumer>
//     );
// }

// export default ColorBox;


// 2번
import React, { useContext } from "react";
import ColorContext from "../contexts/color";

const ColorBox = () => {
    const {state} = useContext(ColorContext);

    return (
        <>
            <div 
                style={{
                    width: '64px',
                    height: '64px',
                    background: state.color
                }}
            />
            <div 
                style={{
                    width: '64px',
                    height: '64px',
                    background: state.subcolor
                }}
            />
        </>
    );
}
export default ColorBox;