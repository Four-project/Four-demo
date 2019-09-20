const express=require("express")
const rounter=express.Router()
const jsonwebtoken=require("jsonwebtoken")
const screat="vjbvfaisdbvashfoirhfojfbvieipwfiwv"
rounter.get("/login",(req,res)=>{
    let token=jsonwebtoken.sign({us:"123",uid:"123"},screat,{expiresIn:60*60*7})
    res.send({err:0,msg:"ok",token:token})
})

module.exports =  rounter

