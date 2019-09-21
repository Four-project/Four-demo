const express=require("express")
const router=express.Router()
const UserModel=require("../../../api/db/model/usermodel")
//商品添加
/**
 * @api {get} /user/:id Request User information
 * @apiName add
 * @apiGroup adminfood
 *
 * @apiParam {String} name
 * @apiParam {String} desc
 * @apiParam {Number} img
 * @apiParam {Number} price
 * @apiParam {String} foodytpe
 * 
 *
 * @apiSuccess {number} err  错误码
 * @apiSuccess {String} mag   错误信息
 */
router.get("/add",(req,res)=>{
    console.log("进入")
    let {name,tel,num,station,type,status}=req.query
    UserModel.insertMany({name,tel,num,station,type,status})
    .then((data)=>{
        console.log('12345767889')
        if(data.length>0){
            res.send({err:0,msg:"添加ok"})
        }else{
            res.send({err:-1,msg:'添加nook'})
        }
    }).catch((err)=>{
        res.send({err:-880,msg:"内部错误请重试"})
    })

})
//删除
/**
 * @api {get} /user/:id Request User information
 * @apiName del
 * @apiGroup adminfood
 *
 * @apiParam {Number} _id
 * 
 * @apiSuccess {number} err  错误码
 * @apiSuccess {String} mag   错误信息
 */
router.get("/del",(req,res)=>{
    let {_id}=req.query
    UserModel.deleteOne({_id:_id} || {key:_id})
    .then((data)=>{
        res.send({err:0,msg:"删除成功"})
    })
})
//修改
/**
 * @api {get} /user/:id Request User information
 * @apiName update
 * @apiGroup adminfood
 *
 * @apiParam {Number} _id
 * @apiParam {String} name
 * @apiParam {String} desc
 * @apiParam {Number} img
 * @apiParam {Number} price
 * @apiParam {String} foodytpe
 * 
 *
 * @apiSuccess {number} err  错误码
 * @apiSuccess {String} mag   错误信息
 */
router.get("/update",(req,res)=>{
    let {_id,name,tel,num,station,type,status}=req.query
    UserModel.updateOne({_id:_id},{name,tel,num,station,type,status})
    .then((data)=>{
        console.log(data)
        res.send({err:0,msg:"修改成功"})
    })
})
//查询
router.get("/find",(req,res)=>{
    let {_id}=req.query
    UserModel.find({_id})
    .then((data)=>{
        res.send({err:0,msg:"查询成功",list:data})
    })
})
// 分页查询
// router.get("/findByPage",(req,res)=>{
//     let {page,pageSize}=req.query
//     let total=0
//     foodModel.find()
//     .then((data)=>{
//         total=data.length
//         return  foodModel.find().limit(Number(pageSize)).skip((page-1)*pageSize)
//     })
   
//     .then((data)=>{
//         console.log(data)
//         res.send({err:0,msg:"查询成功",list:data,total:total})
//     })
// })
// //分类查询
// router.get("/findByType",(req,res)=>{
//     let {foodtype,page,pageSize}=req.query
//     let  total=0
//     foodModel.find({foodtype})
//     .then((data)=>{
//         total=data.length
//         return foodModel.find({foodtype}).skip((page-1)*pageSize).limit(Number(pageSize))
//     })
//     .then((data)=>{
//         res.send({err:0,msg:"查询成功",list:data,total:total})
//     })

// })
//分类分页汇总查询
/**
 * @api {get} /user/:id Request User information
 * @apiName findByTypePage
 * @apiGroup adminfood
 *
 * @apiParam {Number} foodtype
 * @apiParam {String} page
 * @apiParam {String} pageSize
 * 
 * @apiSuccess {number} err  错误码
 * @apiSuccess {String} mag   错误信息
 * @apiSuccess {String} list  查询结果
 * @apiSuccess {number} total  总数
 */
router.get("/findByTypePage",(req,res)=>{
    let {station,page,pageSize}=req.query
    let typeSearch={}
    let total=0
    if(station){
    typeSearch.station=station
    }
    UserModel.find(typeSearch)
    .then((data)=>{
        total=data.length
        return UserModel.find(typeSearch).skip((page-1)*pageSize).limit(Number(pageSize)).sort({price:1})
    })
    .then((data)=>{
        res.send({err:0,mas:"查询完成",list:data,total:total})
    })
})
//模糊查询
/**
 * @api {get} /user/:id Request User information
 * @apiName findByTypePage
 * @apiGroup adminfood
 *
 * @apiParam {String} kw
 * 
 * @apiSuccess {number} err  错误码
 * @apiSuccess {String} mag   错误信息
 * @apiSuccess {String} list  查询结果
 */
router.get("/findBykw",(req,res)=>{
    let {kw,page,pageSize}=req.query
    let reg=new RegExp(kw)
    let total=0
    UserModel.find({$or:[{name:{$regex:reg}},{tel:{$regex:reg}},{num:{$regex:reg}},{type:{$regex:reg}},{status:{$regex:reg}},{station:{$regex:reg}}]})
    .then((data)=>{
        total=data.length       
        return UserModel.find({$or:[{name:{$regex:reg}},{tel:{$regex:reg}},{num:{$regex:reg}},{type:{$regex:reg}},{status:{$regex:reg}},{station:{$regex:reg}}]}).skip((page-1)*pageSize).limit(Number(pageSize)).sort({num:1})
    })
    .then((data)=>{
        res.send({err:0,msg:"查询完成",list:data,total:total})
    })   
})
module.exports =  router

