//创建 token(需要安装jsonwebtoken插件)
const jsonwebtoken=require('jsonwebtoken')
let payload={us:'wangyi',uid:'134651321'}//载荷
let screact='qeoigthasoijgoisdjokfgjasdlkgj'//秘钥
// let token=jsonwebtoken.sign(payload,screact,{expiresIn:60*60})//配置项expiresIn是用来 设置过期时间
// console.log(token)

let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cyI6Indhbmd5aSIsInVpZCI6IjEzNDY1MTMyMSIsImlhdCI6MTU2NTMyNDA5OCwiZXhwIjoxNTY1MzI3Njk4fQ.xs1CiJFJv78gURTSjA2P-QI-myTAn7zdQOqc-bm5Y_I'
//验证token的合法性
jsonwebtoken.verify(token,screact,(err,data)=>{
    console.log(err)
    console.log(data)
})