import React, { Component } from 'react';

class NewUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:''
        };
    }


    submitAddUserForm = (e) => {
        e.preventDefault();
        fetch('/users/signup', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
                profileImage:e.target.profileImage.value,
            }),
        })
};

    render() {
        return (
            <div>
                <h1>Add User</h1>
                <form onSubmit={this.submitAddUserForm}>
                    <p>
                        <label htmlFor={"username"}>Enter Username:</label>
                        <input id={"username"} type="text" name='username' placeholder="Enter username" autoFocus/>
                    </p>
                    <p>
                        <label htmlFor={"password"}>Enter password:</label>
                        <input id={"password"} type="password" name='password' placeholder="Enter password"/>
                    </p>
                    <p>
                        <label htmlFor={"profileImage"}>ProfileImage:</label>
                        <input id={"profileImage"} type="profileImage" name='profileImage' placeholder="Pick your best photo"/>
                    </p>
                    <button >Sign In</button>
                </form>
                {this.state.data}
            </div>
        );
    }
}

export default NewUser;
