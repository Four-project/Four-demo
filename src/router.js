import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App';
import React,{Component} from 'react'
import Admin from 'pages/admin'
import Login from 'pages/login'
import FoodList from 'pages/foodlist'
import UserList from 'pages/userlist'
import UserAdd from 'pages/useradd'
class RootRouter extends Component{
  render(){
    return(
      <App>
        <HashRouter>
          <Switch>
          <Redirect exact from='/' to='/admin'></Redirect> 
          <Route path='/admin' render={()=>{
            return(
              <Admin>
                <Route path='/admin/food/foodlist' component={FoodList}></Route>
                <Route path='/admin/owner/userlist' component={UserList}></Route>
                <Route path='/admin/owner/useradd' component={UserAdd}></Route>
              </Admin>
            )
          }}> 
          </Route>
          <Route path='/login' component={Login}></Route>
          </Switch>
        </HashRouter>
      </App>
    )
  }
}
export default RootRouter

