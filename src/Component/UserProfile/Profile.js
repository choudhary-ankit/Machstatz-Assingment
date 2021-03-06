import React, { Component } from 'react';
import Style from './Profile.module.css';
import firebase from '../../Firebase'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class Userprofile extends Component {
    constructor(props){
        super(props)
        this.state={
            userUID:'',
            name:'',
            email:'',
            readonly:true,
            login_status:false,
        }
    }
    componentDidMount=()=>{
        var login= localStorage.getItem('loggedInUser')
        if(login==='Abxhdgfanh'){
            firebase.auth().onAuthStateChanged((user)=>{
                this.setState({
                    userUID:user.uid,
                    name:user.displayName,
                    email:user.email,
                    login_status:true
                })
            })
        }
        else{
            this.setState({
                login_status:false
            })
        }
      
        
    }
    
    readonly=()=>{
        this.setState({
            readonly:false
        })
    }
    save=()=>{
        this.setState({
            readonly:true   
        })
        var user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: this.state.name,
        })
        .then(function() {
            alert("Update successful")
            window.location.reload();
        })
        .catch(function(error) {
            alert(error.message)
        });
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        
        
    }
    render() {
        return (
            <div className={Style.body}>
                {
                    this.state.login_status===true?
                        <div className={Style.card_body}>
                            <Card  className={Style.card_arrng}>
                                <div className={Style.card_div}>
                                    <div className={Style.img_div}>
                                        <AccountCircleIcon style={{width:"100px", height:"100px", color:"#3f51b5"}}/>
                                    </div>
                                    <div className={Style.name_div}>
                                        <TextField  label="Name" value={this.state.name} onChange={this.handleChange} name="name" style={{width:"250px", marginTop:"15px"}}   inputProps={{
                                            readOnly: Boolean(this.state.readonly),
                                        }}
                                        />
                                        <button className={Style.edit_btn} onClick={this.readonly}>Edit</button>
                                    </div >
                                    <div className={Style.name_div}>
                                        <TextField  label="Email's" value={this.state.email}  onChange={this.handleChange} name="email" style={{width:"250px",marginTop:"15px"}}
                                            inputProps={{readOnly: Boolean(this.state.readonly)}}
                                        />
                                    </div>
                                    <div style={{marginTop:"5px"}}>
                                        <Button variant="contained" style={{backgroundColor:"#3f51b5", color:"#2fd7e4"}} onClick={this.save}>Save</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    :
                    <div className={Style.not_auth}>
                        <p style={{textAlign:"center"}}>**You are not Authorise, please login your account</p>
                    </div>
                }
            </div>
        )
    }
}
