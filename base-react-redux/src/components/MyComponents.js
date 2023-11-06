import React from "react";
class MyComponents extends React.Component {
    state = {
        name: "tam",
        address: "HCM",
        age: "24"
    }
    handleClick(event) {
        console.log(">>>Click me", event.pageX)
    }
    handleOnMouseOver(event) {
        console.log(">>>Click me", event)
    }
    render() {
        return (
            <div>
                My name is {this.state.name} and I am from {this.state.address}
                <button onClick={this.handleClick}>Click me</button>
                <button onMouseOver={this.handleOnMouseOver}>Click me</button>
            </div>
        );
    }
}

export default MyComponents;