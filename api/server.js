const express=require("express")
const app=express()
const mongodb=require("./db/connect")
const path=require("path")
const Adminlogin=require("./router/admin/login")
const AdminUser=require("./router/admin/userRouter")
const AdminFood=require("./router/admin/foodRouter")
const middleWare=require("./middleWare/middleWare")
const Adminfile=require("./router/admin/uploadRouter")
const cors=require("cors")
app.use(cors())
//路径
app.use('/public',express.static(path.join(__dirname,'./www')))
// pose
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 图片
app.use("/admin/file",Adminfile)
app.use("/admin/user",Adminlogin)
app.use("/admin/food",middleWare.tokenMiddleWare,AdminFood)
app.use("/admin/owner",middleWare.tokenMiddleWare,AdminUser)

app.listen(8080,()=>{
    console.log("服务器start")
})

