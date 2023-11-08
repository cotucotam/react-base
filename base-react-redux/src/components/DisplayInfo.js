import React from "react";
class DisplayInfo extends React.Component {
    render() {
        console.log("props", this.props)
        return (
            <div>
                My Nam is {this.props.name}
                <br />
                I am {this.props.age}
            </div>
        );
    }
}
export default DisplayInfo