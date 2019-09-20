var mongoose=require("mongoose")
mongoose.connect("mongodb://10.9.22.208:27017/shopping",{ useNewUrlParser: true })
var db=mongoose.connection;
db.on("error",()=>{
    console.log("数据库链接失败")
})
db.once("open",()=>{
    console.log("数据库链接成功")
})