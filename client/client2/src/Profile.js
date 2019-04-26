import React, { Component } from 'react';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state={
           notice:''
        };
    }
    TweetsSubmit=(e)=>{
        e.preventDefault();
            fetch('/users/addTweet')
            {
            method:"POST",
            header:{
             "Accept":"application/json"
                "Content-Type":"application/json"
            },
            body.JSON.stringify(
                username:this.props.username,
                tweets:{
                    text:e.target.text.value,
                    imageURL:e.target.imageURL,
                 }
            })

        }

    }
    .then(data=>data.text())
    .then(response=>this.setState({notice:response}))
}




    render(){
        return(
            <div>
                <h1>Profile</h1>
                <form onSubmit={this.TweetsSubmit}>
                    <p>
                        <label htmlFor={'text'}>Text</label>
                        <input type="text" id={"text"} name={'text'}/>
                    </p> <p>
                    <label htmlFor={"image"}>Upload Image:</label>
                    <input type="text" id={"image"} name={"image"}/>
                </p>

            </div>
        );
    }
}

export default Profile;