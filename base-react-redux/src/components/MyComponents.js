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
    handleOnChange = (event) => {
        this.setState({
            name: event.target.value,
            age: Math.floor(Math.random() * 100 + 1)
        })
        console.log(">>>handleOnChange ", event.target.value)
    }
    handleOnSubmit = (event) => {
        event.preventDefault()
        // alert("me")
        console.log(">>>Submit ", this.state)
    }
    render() {
        return (
            <div>
                My name is {this.state.name} and I am from {this.state.address} , i am {this.state.age}
                <button onClick={this.handleClick}>Click me</button>
                <button onMouseOver={(event) => { this.handleOnMouseOver(event) }}>Click me</button>
                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <input
                        type="text"
                        onChange={(event => { this.handleOnChange(event) })} />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default MyComponents;