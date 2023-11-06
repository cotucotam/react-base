import React from "react";
class MyComponents extends React.Component {
    state = {
        name: "tam",
        address: "HCM",
        age: "24"
    }
    render() {
        return (
            <div>
                My name is {this.state.name} and I am from {this.state.address}
            </div>
        );
    }
}

export default MyComponents;