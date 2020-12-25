import React, { Component } from 'react'
import NavApp from './Component/NavBar/NavApp'
import Style from './App.css'
import SinginSingup from './Component/AuthPage/SigninSingup';
import Dashboard from './Component/Dashboard/Dashboard';
import Profile from './Component/UserProfile/Profile'
import {Route} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="body">
        <video autoPlay loop muted className="background">
          <source src="./space.mp4" type="video/mp4"/>
        </video>
        <NavApp/>
        <Route path ="/" exact component={SinginSingup}></Route>
        <Route path ="/dashboard" exact component={Dashboard}></Route>
        <Route path ="/profile" exact component={Profile}></Route>
      </div>
    )
  }
}
