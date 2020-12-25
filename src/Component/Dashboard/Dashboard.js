import React, { Component } from 'react';
import Style from './Dashboard.module.css'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Axios from 'axios'
export default class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            tabvalue:0,
            planets:[],
            fvrt:[],
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
        Axios.get('https://assignment-machstatz.herokuapp.com/planet')
        .then(responce=>{
            responce.data.map(e =>{
                this.state.planets.push(e)
                this.forceUpdate();
            })
        })
        .catch(error=>{
            alert("error")
        })
    }
    favoritePlanets=(id)=>{
        this.state.planets.map((e,i)=>{
            if(e.id===id){
                let data={
                    id:e.id,
                    name:e.name,
                    isFavourite:true,
                }
                this.state.fvrt.push(data)
                this.state.planets.splice(i, 1);
                this.forceUpdate();
            }

        })
    }
    deletePlanets=(id)=>{
        this.state.planets.map((e,i)=>{
            if(e.id===id){
                this.state.planets.splice(i, 1);
                this.forceUpdate();
            }

        })
    }
    unFvrtPlanets=(id)=>{
        this.state.fvrt.map((e,i)=>{
            if(e.id===id){
                let data={
                    id:e.id,
                    name:e.name,
                    isFavourite:false,
                }
                this.state.planets.push(data)
                this.state.fvrt.splice(i, 1);
                this.forceUpdate();
            }

        })
    }
    deleteFvrtPlanets=(id)=>{
        this.state.fvrt.map((e,i)=>{
            if(e.id===id){
                this.state.fvrt.splice(i, 1);
                this.forceUpdate();
            }

        })
    }
    render() {
        console.log(this.state.planets)
        return (
            <div className={Style.body}>
                {
                    this.state.authVerification===true?
                    <>
                        <div className={Style.tabbar}>
                            <AppBar position="static" color="transparent" className={Style.appbar}>
                                <Tabs value={this.state.tabvalue}>
                                    <Tab label="planets"  onClick={this.tabChange=()=>{this.setState({tabvalue:0})}} style={{width:"50%", fontFamily:"SF-Fourche"}}/>
                                    <Tab label="Favorite planets" onClick={this.tabChange=()=>{this.setState({tabvalue:1})}}  style={{width:"50%", fontFamily:"SF-Fourche"}}/>
                                </Tabs>
                            </AppBar>
                        </div>
                        <Card className={Style.card}>
                            <div className={Style.card_body}>
                                {
                                    this.state.tabvalue===0?
                                    <ol className={Style.ol_arrng}>
                                        {
                                            this.state.planets.map((e)=>{
                                                return(
                                                    <>
                                                        <li style={{width:'100%'}}>
                                                            <div className={Style.li_arrng}>
                                                                <div className={Style.title}>
                                                                    <p className={Style.text}>{e.name}</p>
                                                                </div>
                                                                <div className={Style.icons_arrng}>
                                                                    <FavoriteIcon onClick={()=>this.favoritePlanets(e.id)} className={Style.iconsfvrt}/>
                                                                    <DeleteIcon onClick={()=>this.deletePlanets(e.id)} className={Style.iconsdelete}/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <Divider style={{backgroundColor:"red", width:"95%"}}/>
                                                    </>
                                                )
                                            })
                                        }
                                    </ol>
                                    :
                                    <ol className={Style.ol_arrng}>
                                        {
                                            this.state.fvrt.map((e)=>{
                                                return(
                                                    <>
                                                        <li style={{width:'100%'}}>
                                                            <div className={Style.li_arrng}>
                                                                <div className={Style.text}>
                                                                    <p>{e.name}</p>
                                                                </div>
                                                                <div className={Style.icons_arrng}>
                                                                    <FavoriteIcon onClick={()=>this.unFvrtPlanets(e.id)}className={Style.iconsunfvrt}/>
                                                                    <DeleteIcon onClick={()=>this.deleteFvrtPlanets(e.id)} className={Style.iconsdelete}/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <Divider style={{backgroundColor:"red", width:"95%"}}/>
                                                    </>
                                                )
                                            })
                                        }
                                    </ol>
                                }
                            </div>
                        </Card>
                    </>
                    :
                    <div className={Style.authorisation}>
                        **You are not authories for this page, please SignIn 
                    </div>
                    
                }
            </div>
        )
    }
}
