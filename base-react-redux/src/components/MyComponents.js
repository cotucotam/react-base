import React from "react";
class MyComponents extends React.Component {
    state = {
        name: "tam",
        address: "HCM",
        age: "24"
    }
    handleClick = (event) => {
        console.log(">>>Click me", event.pageX)
        console.log("this.state.address", this.state.address)
        this.setState({
            name: 'co tam',
            age: Math.floor(Math.random() * 100 + 1)
        })
    }
    handleOnMouseOver = (event) => {
        console.log(">>>Click me", event)
        console.log("this.state.address", this.state.address)
    }
    render() {
        return (
            <div>
                My name is {this.state.name} and I am from {this.state.address} , i am {this.state.age}
                <button onClick={this.handleClick}>Click me</button>
                <button onMouseOver={(event) => { this.handleOnMouseOver(event) }}>Click me</button>
            </div>
        );
    }
}

export default MyComponents;