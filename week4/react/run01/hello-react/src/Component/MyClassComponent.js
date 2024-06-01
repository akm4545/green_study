import React, {Component} from 'react';

class MyClassComponent extends Component {
    static defaultProps = {
        name: '기본 이름'
    }

    render(){
        const {name, children} = this.props;

        return (
            <div>
                안녕하세요 제 이름은 {name} 입니다. <br/>
                children 값은 {children} 입니다.
            </div>
        )
    }
}

// MyComponent.defaultProps = {
//     name : "기본이름"
// }

export default MyClassComponent;