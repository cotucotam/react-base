import React, { useState } from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";
// class MyComponents extends React.Component {
//     state = {
//         listUsers: [
//             { id: 1, name: "tran co tam 1", age: "10" },
//             { id: 2, name: "tran co tam 2", age: "20" },
//             { id: 3, name: "tran co tam 3", age: "30" }
//         ]
//     }
//     handleClick = (event) => {
//         console.log(">>>Click me", event.pageX)
//         console.log("this.state.address", this.state.address)
//         this.setState({
//             name: 'co tam',
//             age: Math.floor(Math.random() * 100 + 1)
//         })
//     }
//     handleOnMouseOver = (event) => {
//         console.log(">>>Click me", event)
//         console.log("this.state.address", this.state.address)
//     }

//     handleAddNewUser = (userObject) => {

//         this.setState({
//             listUsers: [userObject, ...this.state.listUsers]
//         })
//         console.log(">>>this.state.listUsers ", this.state.listUsers)
//     }
//     hanleDeleteDataUser = (userId) => {
//         let listUserClone = this.state.listUsers
//         listUserClone = listUserClone.filter(item => item.id != userId)
//         this.setState({
//             listUsers: listUserClone
//         })
//     }

//     render() {
//         const MyName = "Tam"
//         const MyAge = 25
//         return (
//             <div>
//                 {/* My name is {this.state.name} and I am from {this.state.address} , i am {this.state.age}
//                 <button onClick={this.handleClick}>Click me</button>
//                 <button onMouseOver={(event) => { this.handleOnMouseOver(event) }}>Click me</button> */}

//                 <AddUserInfo
//                     handleAddNewUser={this.handleAddNewUser} />
//                 {/* <DisplayInfo name={MyName} age={MyAge} />
//                 <hr />
//                 <DisplayInfo name="tam" age="24" /> */}
//                 <DisplayInfo
//                     listUsers={this.state.listUsers}
//                     hanleDeleteDataUser={this.hanleDeleteDataUser}
//                 />

//             </div>
//         );
//     }
// }
const MyComponents = (props) => {
    const [listUser, setListUser] = useState(
        [
            { id: 1, name: "tran co tam 1", age: "10" },
            { id: 2, name: "tran co tam 2", age: "20" },
            { id: 3, name: "tran co tam 3", age: "30" }
        ]
    )
    const handleAddNewUser = (userObject) => {
        setListUser([userObject, ...listUser])
    }
    const hanleDeleteDataUser = (userId) => {
        let listUserClone = listUser
        listUserClone = listUserClone.filter(item => item.id != userId)
        setListUser(listUserClone)
    }
    return (
        <div>
            {/* My name is {this.state.name} and I am from {this.state.address} , i am {this.state.age}
                    <button onClick={this.handleClick}>Click me</button>
                    <button onMouseOver={(event) => { this.handleOnMouseOver(event) }}>Click me</button> */}

            <AddUserInfo
                handleAddNewUser={handleAddNewUser} />
            {/* <DisplayInfo name={MyName} age={MyAge} />
                    <hr />
                    <DisplayInfo name="tam" age="24" /> */}
            <DisplayInfo
                listUsers={listUser}
                hanleDeleteDataUser={hanleDeleteDataUser}
            />

        </div>
    );
}
export default MyComponents;