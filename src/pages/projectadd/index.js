import React,{Component}from 'react'
import {Card, Button, message} from 'antd'
import qs from 'qs'//将对象转换成url字符串格式插件
import Style from './index.module.less'
class FoodAdd extends Component{
  constructor(){
    super()
    this.state={
      title:'',
      intro:'',
      img:'',
      price:'',
      discount_price:'',
      type:'配饰',
      putaway:'是'
    }
  }
  submit=()=>{
    let {title,price,img,intro,discount_price,type,putaway}=this.state
    console.log({title,price,img,intro,discount_price,type,putaway})
    if(img!==''){
      //将对象转换成url字符串格式
      console.log('添加数据')
      let query=qs.stringify({title,price,img,intro,discount_price,type,putaway})
      // console.log(query)
      this.$axios.get('hehe/admin/project/add?'+query)
      .then((data)=>{
        if(data.err==0){
          message.success('添加成功')
        }
      })
    }else{
      message.error('请先上传图片')
    }
    
  }
  upload=()=>{
    //获取文件域的文件信息
    let file=this.refs.file.files[0]
    //创建formdata对象
    let formdata=new FormData()
    //将文件信息以img为key添加到formdata对象中
    formdata.append('img',file)
    this.$axios.post('/hehe/admin/file/upload',formdata)
    .then((data)=>{
      if(data.err==0){
        this.setState({img:data.imgpath})
        console.log(this.state.img)
      }else{
        message.error('文件上传失败请重试')
      }
    })
  }
  render(){
    let {title,price,img,intro,discount_price,type,putaway}=this.state
    let rootimg='http://localhost:8080'
    return(
      <div className={Style.projectadd}>
        <Card title='商品添加'>
          <span className={Style.label}>名称</span><input className={Style.input} type="text" value={title} onChange={(e)=>{
            this.setState({title:e.target.value})
          }}/><br/>
          <span className={Style.label}>原价</span><input className={Style.input} type="text" value={price} onChange={(e)=>{
            this.setState({price:e.target.value})
          }}/><br/>
          <span className={Style.label}>现价</span><input className={Style.input} type="text" value={discount_price} onChange={(e)=>{
            this.setState({discount_price:e.target.value})
          }}/><br/>
          <span className={Style.label}>描述</span><input className={Style.input} type="text" value={intro} onChange={(e)=>{
            this.setState({intro:e.target.value})
          }}/><br/>
          <span className={Style.label}>类型</span>
          <select className={Style.select} value={type} onChange={(e)=>{
            this.setState({type:e.target.value})
          }}>
            <option >女装</option>
            <option >男装</option>
            <option >鞋子</option>
            <option >箱包</option>
            <option >配饰</option>
          </select>
          <br/>
          <span className={Style.label}>是否下架</span>
          <select className={Style.select} value={putaway} onChange={(e)=>{
            this.setState({putaway:e.target.value})
          }}>
            <option >是</option>
            <option >否</option>
          </select>
          <br/>
          <span className={Style.label}>缩略图</span><input className={Style.input} type="file" ref='file'/><br/>
          <img src={rootimg+img} width='80' height='80' alt=""/>
          <Button onClick={this.upload}>上传图片</Button>
          <hr/> 
          
          <Button type="primary" onClick={this.submit}>提交</Button>
        </Card>
      </div>
    )
  }
}
export default FoodAdd