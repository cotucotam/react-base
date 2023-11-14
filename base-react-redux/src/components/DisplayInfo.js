import React from "react";
import './DisplayInfo.scss'
import logo from "./../logo.svg"
class DisplayInfo extends React.Component {
    constructor(props) {
        console.log(">>>Call contructor 1")
        super(props)
        this.state = {
            isShowListUser: true
        }

    }


    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })

    }
    componentDidUpdate(preProps, preState, snapshot) {
        console.log(">>>Call componentDidUpdate", this.props, preProps)
        if (this.props.listUsers !== preProps.listUsers) {
            alert("difference")
        }
    }
    componentDidMount() {
        console.log(">>>Call componentDidMount 1")
        setTimeout(() => { document.title = "Co Tam" }, 3000)
    }
    render() {
        console.log(">>>Call render")
        const listUsers = this.props.listUsers
        console.log("listUsers", listUsers)
        console.log("props", this.props)

        return (
            <>
                <div className="display-info-container">
                    <img src={logo} />
                    <div>
                        <span onClick={() => { this.handleShowHide() }}>
                            {this.state.isShowListUser ? "Hide listUser" : "Show listUser"}
                        </span>
                    </div>
                    {this.state.isShowListUser &&
                        <div>
                            {
                                listUsers.map((user) => {
                                    console.log(">>user", user)
                                    return (
                                        <div key={user.id} className={(+user.age > 18) ? "red" : "green"}>
                                            <div>
                                                <div> My name is {user.name}</div>
                                                {/* <div style={{ color: "yellow", paddingTop: "50px" }}> My name is {user.name}</div> */}
                                                <div> I am {user.age}</div>
                                                <hr />
                                            </div>
                                            <div>
                                                <button onClick={() => this.props.hanleDeleteDataUser(user.id)}>Delete</button>
                                            </div>
                                        </div>
                                    )
                                    // if (+user.age > 18) {
                                    //     return (
                                    //         <div key={user.id} className="red">
                                    //             <div> My name is {user.name}</div>
                                    //             <div> I am {user.age}</div>
                                    //             <hr />
                                    //         </div>
                                    //     )
                                    // } else {
                                    //     return (
                                    //         <div key={user.id} className="green">
                                    //             <div> My name is {user.name}</div>
                                    //             <div> I am {user.age}</div>
                                    //             <hr />
                                    //         </div>
                                    //     )
                                    // }

                                })
                            }
                        </div>
                    }
                </div>
                <div className="test">
                    Tam
                </div>
            </>
            // <div>
            //     My Nam is {this.props.name}
            //     I am {this.props.age}
            //     <hr />
            // </div>
        );
    }
}
export default DisplayInfo