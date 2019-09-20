const express=require('express')
const mongodb=require('./db/connect')
const app=express()
const middleware=require('./middleware/middleware')
const path=require('path')
//解决跨域问题法一（需要安装插件）
// const cors=require('cors')
// app.use(cors())

//解决跨域问题法二
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    next()
})


//post数据分析
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//静态资源路径
app.use('/public',express.static(path.join(__dirname,'./www')))
//引入路由
const  AdminProject=require("./router/admin/projectRouter")
const AdminUser=require('./router/admin/loginRouter')
const AdminUpload=require('./router/admin/uploadRouter')
//调用路由
app.use('/admin/project',middleware.tokenMiddleWare,AdminProject)
app.use('/admin/user',AdminUser)
app.use('/admin/file',AdminUpload)
/*原版
app.listen(3002,()=>{
    console.log('服务器启动')
})  
*/

//使用react改版
app.listen(8080,()=>{
    console.log('服务器启动')
})  