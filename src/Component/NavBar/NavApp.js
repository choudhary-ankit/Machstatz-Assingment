import React, { Component } from 'react';
import Style from './NavApp.module.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
export default class NavApp extends Component {
    constructor(props){
        super(props)
        this.state={
            authVerification:false,
        }
    }
    componentDidMount=()=>{
        var user= localStorage.getItem('loggedInUser')
        if(user==='Abxhdgfanh'){
            this.setState({
                authVerification:true
            })
        }
        else{
            this.setState({
                authVerification:false
            })
        }
    }
    singOut=()=>{
        localStorage.removeItem('loggedInUser');
        window.location.replace('/');

    }
    render() {
        return (
            <div>
                 <AppBar position="static" color="transparent">
                     {
                        this.state.authVerification===true?
                            <Toolbar className={Style.toolbar}>
                                <div className={Style.logo}>
                                    <Typography variant="h6" className={Style.title}>Machstatz</Typography> 
                                </div>
                                <div className={Style.btn_arrng}>
                                    <Link to="/profile" style={{textDecoration:"none", color:"#e50914"}}>
                                        <Button color="inherit" className={Style.btn}>Profile</Button>
                                    </Link>
                                    <Link to="/dashboard" style={{textDecoration:"none", color:"#e50914"}}>
                                        <Button color="inherit" className={Style.btn}>Dashboard</Button>
                                    </Link>
                                    <Button color="inherit" className={Style.btn} onClick={this.singOut}>Signout</Button>   
                                </div>
                            </Toolbar>
                        :
                            <Toolbar className={Style.toolbar}>
                                <div className={Style.logo}>
                                    <Typography variant="h6" className={Style.title}>Machstatz</Typography>
                                </div>
                                <div className={Style.btn_arrng}>
                                    <Link to="/" style={{textDecoration:"none", color:"#e50914"}}>
                                        <Button color="inherit" className={Style.btn}>Signin/Signup</Button>
                                    </Link>
                                </div>
                            </Toolbar>
                     }
                </AppBar>
            </div>
        )
    }
}
