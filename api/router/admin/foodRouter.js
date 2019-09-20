const express=require("express")
const router=express.Router()
const foodModel=require("../../db/model/foodmodel")
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
    let {name,desc,img,price,foodtype}=req.query
    foodModel.insertMany({name,desc,img,price,foodtype})
    .then((data)=>{
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
    foodModel.deleteOne({_id:_id})
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
    let {_id,name,desc,img,price,foodtype}=req.query
    foodModel.updateOne({_id:_id},{name,desc,img,price,foodtype})
    .then((data)=>{
        console.log(data)
        res.send({err:0,msg:"修改成功"})
    })
})
//查询
router.get("/find",(req,res)=>{
    let {_id}=req.query
    foodModel.find({_id})
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
    let {foodtype,page,pageSize}=req.query
    let typeSearch={}
    let total=0
    if(foodtype){
    typeSearch.foodtype=foodtype
    }
    foodModel.find(typeSearch)
    .then((data)=>{
        total=data.length
        return foodModel.find(typeSearch).skip((page-1)*pageSize).limit(Number(pageSize)).sort({price:1})
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
    let {kw}=req.query
    let reg=new RegExp(kw)
    foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})
    .then((data)=>{
        res.send({err:0,msg:"查询完成",list:data})
    })
    
})
module.exports =  router

