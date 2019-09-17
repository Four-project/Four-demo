import React,{Component}from 'react'
import { Form, Icon, Input, Button, Card,message} from 'antd';
import './index.less'
class Login extends Component{
  login=()=>{
    // let result=this.props.form.getFieldsValue()
    //获取一组输入控件的值，如不传入参数，则获取全部组件的值
    //validateFields相当于正则表达式验证是否满足规则
    this.props.form.validateFields((err,data)=>{
      console.log(err,data)
      if(err){
        //前端验证有错误，提示用户此错误信息
        message.error('输入信息有误请重试！')
      }else{
        //前端验证ok 调用ajax接口
        this.$axios.get(`/hehe/admin/user/login?us=${data.us}&ps=${data.ps}`)
        .then(data=>{
          console.log(data)
          if(data.err===0){
            localStorage.setItem('token',data.token)
            message.success('登录成功1s后跳转到首页',1,()=>{
              this.props.history.push('/admin/home')
            })
          }else{
            message.error(data.msg)
          }
        })
      }
    })
  }
  render(){
    // console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    // getFieldDecorator是一个高阶组件,用于和表单进行双向绑定，
    return(
      <Card className='login'>
        <Form.Item>
          {getFieldDecorator('us',{
            //配置规则（如正则表达式之类的）
            rules:[
              {required:true,message:'不能为空'},
              {max:8,message:'最长8个字符'},
              {min:3,message:'最短3个字符'}
            ]
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"/>
          )}    
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('ps',{})(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="password"/>
          )}    
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button onClick={this.login} type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Card>
    )
  }
}
export default Form.create()(Login)
//Form.create是一个高阶组件，处理过后props中就会有form