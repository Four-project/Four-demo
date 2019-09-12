// import React,{Component} from 'react'
import React,{Component}from 'react'
import {withRouter}from 'react-router-dom'
class Nav extends Component{
  constructor(){
    super()
  }
  jump=(path)=>{
    this.props.history.push(path)
  }
  render(){
    return(
      <div>
        <div className='test'>这里是导航</div>
        <ul>
          <li onClick={this.jump.bind(this,'/home')}>首页</li>
          <li onClick={this.jump.bind(this,'/login')}>登录</li>
          <li onClick={this.jump.bind(this,'/food')}>食物</li>
        </ul>
      </div>
    ) 
  }
}
export default withRouter(Nav)