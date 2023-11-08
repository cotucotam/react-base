import React from "react";
class UserInfo extends React.Component {
    state = {
        name: "tam",
        address: "HCM",
        age: "24"
    }
    handleOnChangeName = (event) => {
        this.setState({
            name: event.target.value,
        })
        console.log(">>>handleOnChange ", event.target.value)
    }
    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
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
                <label>Your name</label>
                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <input
                        value={this.state.name}
                        type="text"
                        onChange={(event => { this.handleOnChangeName(event) })} />
                    <button>Submit</button>
                </form>

                <label>Your Age</label>
                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <input
                        value={this.state.age}
                        type="text"
                        onChange={(event => { this.handleOnChangeAge(event) })} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
export default UserInfo