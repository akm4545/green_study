import React, {Component} from "react";

class RefSample extends Component{
    
    ref = React.createRef()

    handleFocus = () => {
        this.ref.current.focus()
    }

    render(){
        return(
            <div>
                <input ref={this.ref} />
            </div>
        )
    }
}
export default RefSample

