const express=require('express')
const multer=require('multer')//前端上传图片的模块 
const fs=require('fs')
const path=require('path')
const router=express.Router()
/**
 * @api {post} /admin/file/upload 文件上传
 * @apiName upload
 * @apiGroup file
 * 
 * @apiParam {String} img formdata格式图片
 * 
 * @apiSuccess {Number} err 错误码
 * @apiSuccess {String} msg 错误信息
 * @apiSuccess {String} imgpath 返回图片所在的相对路径
 */
router.post('/upload',multer().single('img'),(req,res)=>{
    console.log(req.file)
    let {buffer,mimetype}=req.file
    let filename=(new Date()).getTime()+parseInt(Math.random()*99999)+parseInt(Math.random()*4646878456459)
    let extname=mimetype.split('/')[1]

    let imgpath=`/public/images/${filename}.${extname}`
    let dir=path.join(__dirname,'../../www/images')
    fs.writeFile(`${dir}/${filename}.${extname}`,buffer,(err)=>{
        console.log(err)           
        if(err){
            res.send({err:-1,msg:'上传失败'})
        }else{
            res.send({err:0,msg:'上传成功',imgpath:imgpath})
        }
    })
})
module.exports=router