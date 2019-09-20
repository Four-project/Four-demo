import React,{Component} from 'react'
import { Table ,Pagination,Button ,Card, message,Popconfirm} from 'antd';
import UserUpdate from '../userUpdate/index'
// import {Card,Table,Pagination,Spin,Popconfirm,message} from 'antd'
import './index.less'
class UserList extends Component {
  constructor(){
    super()
    this.state={
      name:'',
      tel:"",
      num:'',
      station:'',
      type:'超级管理员',
      status:'禁用',
      telStyle:{
        color:'red',
        display:'none',
        width:"200px"
      },
      numStyle:{
        color:'red',
        display:'none',
        width:"200px"
      }
    }
  }
  add=()=>{
    let {name,tel,num,station,type,status}=this.state
    console.log(this.state)
    this.$axios.get(`/hehe/admin/owner/add?name=${name}&tel=${tel}&type=${type}&num=${num}&station=${station}&status=${status}`)
    .then((data)=>{
      if(data.err===0){
        message.success("添加成功")
        this.props.history.push('/admin/owner/userlist')
        // this.initData(this.state.page,this.state.pageSize)
      }else{
        message.error('添加失败请重试')
      }
    })
  }
  render() {
    let {name,tel,num,station,type,status,telStyle,numStyle}=this.state 
    return(   
      <Card >
        <div className="useradd">
          <span>姓名：</span><input type="text" value={name} onChange={(e)=>{
           
           this.setState({name:e.target.value})
          }}/>
          <br/>
          <span>电话：</span><input type="text" value={tel} 
          onChange={(e)=>{
           this.setState({tel:e.target.value})
          }} 
          onBlur={()=>{if(!/^1[2-9]\d{9}$/.test(this.state.tel)){
              this.setState({telStyle:{color:'red',display:'inline-block',width:"200px"}})
          }}
            }/>
          <span className="tel" ref="tel" style={telStyle}>格式错误，请重新输入</span>
          <br/>
          <span>工号：</span>
          <input type="text" value={num} 
               onChange={(e)=>{this.setState({num:e.target.value})}}
               onBlur={()=>{if(!/\d{4}/.test(this.state.num)){
                this.setState({numStyle:{color:'red',display:'inline-block',width:"200px"}})
            }}
          }/>
          <span className="tel" ref="tel" style={numStyle}>格式错误，请重新输入</span>
          <br/>
          <span>岗位：</span><input type="text" value={station} onChange={(e)=>{
            this.setState({station:e.target.value})
          }}/>
          <br/>
          <span>角色：</span>
          <select name="" id="" value={type} onChange={(e)=>{
           this.setState({type:e.target.value})
          }} >
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
          <Popconfirm
                placement="top"
                title={'您确认添加吗'}
                onConfirm={this.add}
                okText="Yes"
                cancelText="No"
              >
                  <Button size='small' type="primary">提交</Button>
              </Popconfirm>
        </div>
      </Card>);
  }
}


export  default UserList