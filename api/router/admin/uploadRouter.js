const express=require("express")
const router=express.Router()
const multer=require("multer")
const fs=require("fs")
const path=require("path")
router.use('/public',express.static(path.join(__dirname,'./www')))
router.post("/picture",multer().single("img"),(req,res)=>{
   
    let {buffer,mimetype}=req.file
     console.log(req.file)
    let filename=(new Date()).getTime()+parseInt(Math.random()*999999)+parseInt(Math.random()*468376592173657)
    let extname=mimetype.split("/")[1]
    let path=`/public/images/${filename}.${extname}`
    fs.writeFile(`./www/images/${filename}.${extname}`,buffer,(err)=>{
        if(err){
          console.log(err)
            res.send({err:-1,msg:"上传失败"})
        }else{
            res.send({err:0,msg:"好的",imgpath:path})
        }
    })
})
module.exports=router