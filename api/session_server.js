const express=require('express')
const app=express()
const session=require('express-session')//在express框架中使用session
const path=require('path')
app.use(express.static(path.join(__dirname,'./www')))
app.use(session({
    secret:'hubwizApp',//为了安全性的考虑设置secret属性
    cookie:{maxAge:1000*30},//设置过期时间（以毫秒为单位）
    resave:true,//及时session没有被修改，也保存session值，默认为true
    saveUninitalized:false//无论有没有session cookie，每次请求都设置个session cookie，默认是个标示为connect。sid

}))

app.get('/login',(req,res)=>{
    console.log(req.session)
    req.session.uid='wangyi'
    res.send('登录成功')
})
app.get('/test',(req,res,next)=>{
    let {uid}=req.session
    if(uid){
        next()
    }else{
        res.send('登录失效请重试')
    }
},(req,res)=>{
    console.log(req.session)
    res.send('测试成功')
})
app.listen(3001,()=>{
    console.log('服务器启动')
})