import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";
class MyComponents extends React.Component {

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
        const MyName = "Tam"
        const MyAge = 25
        return (
            <div>
                {/* My name is {this.state.name} and I am from {this.state.address} , i am {this.state.age}
                <button onClick={this.handleClick}>Click me</button>
                <button onMouseOver={(event) => { this.handleOnMouseOver(event) }}>Click me</button> */}

                <UserInfo />
                <DisplayInfo name={MyName} age={MyAge} />
                <hr />
                <DisplayInfo name="tam" age="24" />
            </div>
        );
    }
}

export default MyComponents;