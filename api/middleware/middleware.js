/*原版
const jwt=require('jsonwebtoken')
let screat='aghoaewghladsghdslg'
module.exports={
    tokenMiddleWare(req,res,next){
        //验证token的合法性的中间件
        let {token}=req.body
        if(token){
            console.log(token)
            jwt.verify(token,screat,(err,info)=>{
                if(err){
                    console.log(err)
                    res.send({err:-997,msg:'token失效'})
                }else{
                    next()
                }
            })
        }else{
            res.send({err:-998,msg:'token缺失 '})
        }
    }
}
*/
/*改版*/
const jwt=require('jsonwebtoken')
let screat='aghoaewghladsghdslg2gd2'
module.exports={
    tokenMiddleWare(req,res,next){
       // 验证token的合法性的中间件
        let {token}=req.query
        if(token){
            console.log(token)
            jwt.verify(token,screat,(err,info)=>{
                if(err){
                    console.log('错误提示',err)
                    res.send({err:-997,msg:'token失效'})
                }else{
                    next()
                }
            })
        }else{
            res.send({err:-998,msg:'token缺失 '})
        }
    }
}


