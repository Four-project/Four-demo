//连接数据库
var mongoose=require('mongoose')
mongoose.connect('mongodb://10.9.22.208:27017/shopping',{ useNewUrlParser: true })
var db=mongoose.connection
db.on('error',()=>{
    console.log('数据库连接失败')
})
db.once('open',function(){
    console.log('数据库连接成功')
})