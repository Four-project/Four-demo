import {HashRouter,Route,Switch} from 'react-router-dom'
import App from './App';
import React,{Component} from 'react'
import User from './pages/user'
class RootRouter extends Component{
  render(){
    return(
      <App>
        <HashRouter>
        <Switch>
            <Route path='/user' component={User}></Route>
          </Switch>
        </HashRouter>
      </App>
    )
  }
}
export default RootRouter

