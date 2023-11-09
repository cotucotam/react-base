import React from "react";
class DisplayInfo extends React.Component {
    render() {
        const listUsers = this.props.listUsers
        console.log("listUsers", listUsers)
        console.log("props", this.props)
        return (
            <div>
                {
                    listUsers.map((user) => {
                        console.log(">>user", user)
                        return (
                            <div key={user.id}>
                                <div> My name is {user.name}</div>
                                <div> I am {user.age}</div>
                                <hr />
                            </div>
                        )
                    })
                }
            </div>
            // <div>
            //     My Nam is {this.props.name}
            //     I am {this.props.age}
            //     <hr />
            // </div>
        );
    }
}
export default DisplayInfo