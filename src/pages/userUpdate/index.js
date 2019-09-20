import React,{Component} from 'react'
import {Card,Table,Button,Pagination,Spin,Popconfirm, message}from 'antd'
import  './index.less'
import qs from 'qs'
class UserUpdate extends Component{
  constructor(props){
    super(props)
    this.state=props.record
  }
  submit=()=>{
    let {_id,name,tel,num,station,type,status}=this.state
    let string=qs.stringify({_id,name,tel,num,station,type,status})
    this.$axios.get('/hehe/admin/owner/update?'+string)
    .then((data)=>{
      this.props.refreshfun()
    })
  }
  render(){
    let {name,tel,num,station,type,status}=this.state   
    return(
      <Card className='updateModel'>
        <div className="wraper">
          <span>姓名：</span>
          <input type="text" value={name} onChange={(e)=>{
            this.setState({name:e.target.value})
          }}/>
          <br/>
          <span>电话：</span>
          <input type="textr" value={tel} onChange={(e)=>{
            this.setState({tel:e.target.value})
          }}/>
          <br/>
          <span>工号：</span>
          <input type="text" value={num} onChange={(e)=>{
            this.setState({num:e.target.value})
          }}/>
          <br/>
          <span>岗位：</span>
          <input type="text" value={station} onChange={(e)=>{
            this.setState({station:e.target.value})
          }}/>
          <br/>
          <span>角色：</span>
          <select value={type} onChange={(e)=>{
            
            this.setState({type:e.target.value})
          }}>
            <option value="超级管理员">超级管理员</option>
            <option value="高级管理员">高级管理员</option>
            <option value="中级管理员">中级管理员</option>
            <option value="线下管理员">线下管理员</option>
          </select>
          <br/>
          <span>状态：</span>
          <select name="" id="" value={status}
                      onChange={(e)=>{
                        this.setState({status:e.target.value})
                      }}
            >
              <option value="禁用">禁用</option>
              <option value="解封">解封</option>
            </select>
            <br/>
          <Button className="button" onClick={this.submit}>修改</Button>
        </div>
    </Card>
    )
  }
}
  
export default UserUpdate