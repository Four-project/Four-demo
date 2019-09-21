const express=require('express')
const jwt=require('jsonwebtoken')
let screat='aghoaewghladsghdslg2gd2'
const router=express.Router()
/**
 * @api {post} /admin/user/login 登录
 * @apiName login
 * @apiGroup user
 * 
 * @apiParam {String} us
 * @apiParam {String} ps
 * 
 * @apiSuccess {Number} err 错误码
 * @apiSuccess {String} msg 错误信息
 * @apiSuccess {String} token 令牌
 */
/*post 方式请求（原版）
router.post('/login',(req,res)=>{
    let token=jwt.sign({us:'123',uid:'123'},screat,{expiresIn:60*60*24*7})
    res.send({err:0,msg:'成功',token:token})
})                          
*/ 
/*get 方式请求（使用react做后台管理系统时用到修改的）*/
router.get('/login',(req,res)=>{
  let token=jwt.sign({us:'123',uid:'123'},screat,{expiresIn:60*60*5})
  res.send({err:0,msg:'ok',token:token})
})
module.exports=router