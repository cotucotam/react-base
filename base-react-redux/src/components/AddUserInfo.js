import React, { useState } from "react";
// class AddUserInfo extends React.Component {
//     state = {
//         name: "tam",
//         address: "HCM",
//         age: "24"
//     }
//     handleOnChangeName = (event) => {
//         this.setState({
//             name: event.target.value,
//         })
//         console.log(">>>handleOnChange ", event.target.value)
//     }
//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//         console.log(">>>handleOnChange ", event.target.value)
//     }
//     handleOnSubmit = (event) => {
//         event.preventDefault()
//         // alert("me")
//         // console.log(">>>Submit ", this.state)
//         this.props.handleAddNewUser({
//             id: Math.floor(Math.random() * 100 + 1) + '-random',
//             name: this.state.name,
//             age: this.state.age
//         })
//     }
//     render() {
//         return (
//             <div>
//                 My name is {this.state.name} and I am from {this.state.address} , i am {this.state.age}
//                 <label>Your name</label>
//                 <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
//                     <input
//                         value={this.state.name}
//                         type="text"
//                         onChange={(event => { this.handleOnChangeName(event) })} />
//                     <button>Submit</button>
//                 </form>

//                 <label>Your Age</label>
//                 <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
//                     <input
//                         value={this.state.age}
//                         type="text"
//                         onChange={(event => { this.handleOnChangeAge(event) })} />
//                     <button>Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }
const AddUserInfo = (props) => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("HCM")
    const [age, setAge] = useState("")
    const handleOnChangeName = (event) => {
        setName(event.target.value)
    }
    const handleOnChangeAge = (event) => {
        setAge(event.target.value)
    }
    const handleOnSubmit = (event) => {
        event.preventDefault()
        props.handleAddNewUser({
            id: Math.floor(Math.random() * 100 + 1) + '-random',
            name: name,
            age: age
        })
    }
    return (
        <div>
            My name is {name} and I am from {address} , i am {age}
            <label>Your name</label>
            <form onSubmit={(event) => { handleOnSubmit(event) }}>
                <input
                    value={name}
                    type="text"
                    onChange={(event => { handleOnChangeName(event) })} />
                <button>Submit</button>
            </form>

            <label>Your Age</label>
            <form onSubmit={(event) => { handleOnSubmit(event) }}>
                <input
                    value={age}
                    type="text"
                    onChange={(event => { handleOnChangeAge(event) })} />
                <button>Submit</button>
            </form>
        </div>
    )
}
export default AddUserInfo