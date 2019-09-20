import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App';
import React,{Component} from 'react'
import Admin from 'pages/admin'
import Login from 'pages/login'
import ProjectList from 'pages/projectlist'
import ProjectAdd from 'pages/projectadd'
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
                <Route path='/admin/project/projectlist' component={ProjectList}></Route>
                <Route path='/admin/project/projectadd' component={ProjectAdd}></Route>
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

