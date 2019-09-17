import React,{Component,Fragment}from 'react'
import {Card} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import ActionCreator from 'store/actionCreator'
import {bindActionCreators} from 'redux'
import './index.less'
class TokenModel extends Component{
  back=()=>{
    //将模态框隐藏，即调用改变state值的方法
    // this.props.test()//写法一
    this.props.changeModelState()//简写形式
    //将路由跳转到登录界面
    this.props.history.push('/login')
  }
  render(){
    console.log(this)
    return(
      <Fragment>
        {!this.props.modelState||<div className='tokenmodel'>
        <Card className='card'>
          <p>token丢失请重新登录</p>
          <button onClick={this.back}>返回登录</button>
        </Card>
      </div>}   
      </Fragment>
    )
  }
}

//写法一
// export default connect(state=>state,(dispatch)=>{
//   return{
//     test(){
//       dispatch(ActionCreator.changeModelState())
//     }
//   }
// })(TokenModel)
//被connect处理过的组件可以实现自动监听，通知页面更新
//props中可以获取全局状态值

//简写形式
//withRouter作用：给组件赋予路由对象以调用路由对象中的方法
let NewComponent=withRouter(TokenModel)
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(ActionCreator,dispatch)
})(NewComponent)
