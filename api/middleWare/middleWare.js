const jwt=require("jsonwebtoken")
const screat="vjbvfaisdbvashfoirhfojfbvieipwfiwv"
module.exports={
    tokenMiddleWare(req,res,next){
        let {token}=req.query
        if(token){
            jwt.verify(token,screat,(err,info)=>{
                console.log(info)
                if(err){
                    res.send({err:-997,msg:'2token失效'}) 
                }else{
                    next()
                }
            })
        }else{
            res.send({err:-998,msg:"1token失效"})
        }
    }
}


