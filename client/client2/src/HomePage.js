import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NewUser from './NewUser'
import UserSignIn from './SignedInData'
// import Profile from './Profile'

class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state={
            logInfo:{
            username:'',
            profileImage:'',
            LoggedIn:false,
            }
        };
    }

    loggedIn=(username,proImg,log)=> {
        this.setState({
            username:username,
            image:proImg,
            loggedin:log
        })
    };

    loggedOut=()=> {
        this.setState({
            username: "",
            image: "",
            loggedIn: false,
        });
        fetch('/users')
            .then(data => {
                return data.text();
            })
    };

    render(){

        return(
            <div className='home' >

                <Router>
                    <h1>Welcome to  (T)ell(I)t(A)LL</h1>
                    <Link className={'linkSpacing'} to='/'>Home</Link>
                    {/*<Link className={'linkSpacing'} to='/SingIn'>SighIn</Link>*/}
                    <Link className={'linkSpacing'} to='/signup'>Join Us Here</Link>
                    <Route exact path={'/'}component={()=><UserSignIn/>}/>
                    <Route path={"/signup"} component={()=><NewUser/>} />
                    {/*<Route path={'/logout'} component={()=><LogOut/>}/>*/}
                    </Router>
                <form> <p>
                    <label htmlFor={"username"}>Enter Username:</label>
                    <input id={"username"} type="text" name='username' placeholder="Enter username" autoFocus/>
                </p>
                <p>
                    <label htmlFor={"password"}>Enter password:</label>
                    <input id={"password"} type="password" name='password' placeholder="Enter password"/>
                </p>>
                    <button >Sign In</button>
                </form>
            </div>
        );
    }
}
export default HomePage;