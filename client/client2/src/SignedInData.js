import React, { Component } from 'react';

class SignedInData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            message: "",
        };
    }

    TweetSubmit = (e) => {
        e.preventDefault();

        fetch('/users/', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: this.props.logInfo.username,
                password: e.target.password.value,
            }),
        })
            .then(data => data.text())
            .then(response => this.setState({message: response}));
    };

    render() {
        if (!this.props.signedIn) {
            return (<div>
                <h1>Sorry you are not logged In</h1>
            </div>)
        }
        else
        {return (
                <div>
                    <h1>
                        Welcome {this.props.logInfo.username}
                    </h1>
                    <form onSubmit={this.TwitterSubmit}>
                        <p>
                            <label htmlFor={'tweets'}>Tell It All:</label>
                            <input type="text"id={'tweets'}name={'tweets'}/>
                        </p>
                        <button>Submit</button>
                    </form>
                    {this.state.message}
                </div>
            );
        }
    }
}


export default SignedInData;
