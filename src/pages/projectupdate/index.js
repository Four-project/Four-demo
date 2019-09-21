import React,{Component}from 'react'
import {Card,Table,Button,Pagination,Spin,Popconfirm,message}from 'antd'
import qs from 'qs'
import './index.less'
class FoodUpdate extends Component{
  constructor(props){
    super(props)
    // console.log(props)
    this.state=props.record
    // console.log(this.state)
  }
  submit=()=>{
    let {_id,title,price,img,intro,discount_price,type,putaway}=this.state
    let string=qs.stringify({_id,title,price,img,intro,discount_price,type,putaway})
    this.$axios.get('/hehe/admin/project/update?'+string)
    .then((data)=>{
      // console.log(data)
      this.props.refreshfun()//通过props调用父组件的方法
    })
  }
  upload=()=>{
    // console.log(this)
    let img=this.refs.img.files[0]
    let formdata=new FormData()
    formdata.append('img',img)
    this.$axios.post('/hehe/admin/file/upload',formdata)
    .then((data)=>{
      console.log(data)
      if(data.err===0){
        this.setState({img:data.imgpath})
      }
    })
  }
  back=()=>{//返回列表页
    this.props.refreshfun()//通过props调用父组件的方法
  }
  render(){
    let {title,price,img,intro,discount_price,type,putaway}=this.state
    let rootPath='http://localhost:8080'
    console.log({title,price,img,intro,discount_price,type,putaway})
    return (
      <div className='updateModel'>
        <Card className='card'>
          <Button className='btn' onClick={this.back}>返回</Button><br/>
          <span>名称</span><input type="text" value={title} onChange={(e)=>{
            this.setState({title:e.target.value})
            console.log(this.state.title)
          }}/><br/>
          <span>原价</span><input type="text" value={price} onChange={(e)=>{
            this.setState({price:e.target.value})
          }}/><br/>
          <span>现价</span><input type="text" value={discount_price} onChange={(e)=>{
            this.setState({discount_price:e.target.value})
          }}/><br/>
           <span>描述</span><input type="text" value={intro} onChange={(e)=>{
            this.setState({intro:e.target.value})
          }}/><br/>
          <span>类型</span>
          <select type="text" value={type} onChange={(e)=>{
            this.setState({type:e.target.value})
          }}>
            <option >女装</option>
            <option >男装</option>
            <option >鞋子</option>
            <option >箱包</option>
            <option >配饰</option>
          </select><br/>
          <span>是否下架</span>
          <select value={putaway} onChange={(e)=>{
            this.setState({putaway:e.target.value})
          }}>
            <option >是</option>
            <option >否</option>
          </select><br/>
          <span>缩略图</span>
          <input type="file" ref='img'/><br/>
          <img src={rootPath+img} alt=""/><br/>
          <Button className='btn' onClick={this.upload}>上传图片</Button><br/>
          <Button type='primary' className='btn btn1' onClick={this.submit}>修改</Button>
        </Card>
      </div>
    )
  }
}
/*
1、是一个模态框
2、显示默认内容
3、修改内容
4、点击提交，关闭模态框 刷新原始页面
*/
export default FoodUpdate 