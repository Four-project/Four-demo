import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App';
import React,{Component} from 'react'
import Home from './components/home'
import Login from './components/login'
import Food from './components/food'
import Nav from './components/nav'
class RootRouter extends Component{
  render(){
    return(
      <App>
        
        <HashRouter>
          <Nav></Nav>
          <Switch>
          <Redirect exact from='/' to='/home'></Redirect> 
          <Route path='/home' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/food' component={Food}></Route>
          </Switch>
        </HashRouter>
      </App>
    )
  }
}
export default RootRouter

