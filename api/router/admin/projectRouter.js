//路由
const express=require('express')
const router=express.Router()
const projectModel=require('../../db/model/projectModel')
//商品添加
/**
 * @api {post} /admin/project/add 菜品添加
 * @apiName add
 * @apiGroup project
 * 
 * @apiParam {String} name
 * @apiParam {String} desc
 * @apiParam {String} img
 * @apiParam {String} price
 * @apiParam {String} projecttype
 * @apiParam {String} token  令牌
 * 
 * @apiSuccess {Number} err 错误码
 * @apiSuccess {String} msg 错误信息
 * @apiSuccess {Array} list 查询的数据
 */
    /*原版
	router.post('/add',(req,res)=>{
        //接收前端数据
        let {name,desc,img,price,projecttype}=req.body
        //处理数据
        projectModel.insertMany({name,desc,img,price,projecttype})
        .then((data)=>{//返回结果
            if(data.length>0){
                res.send({err:0,msg:'添加成功'})
            }else{
                res.send({err:-1,msg:'添加失败'})
            }
        })
        .catch((err)=>{
            res.send({err:-880,msg:'内部错误请重试'})
        })
    })
	*/
	
	/*改版（get方式请求）*/
	router.get('/add',(req,res)=>{
        //接收前端数据
        let {title,discount_price,img,price,type,intro,putaway}=req.query
        //处理数据
        projectModel.insertMany({title,discount_price,img,price,type,intro,putaway})
        .then((data)=>{//返回结果
            if(data.length>0){
				console.log(data)
                res.send({err:0,msg:'添加成功'})
            }else{
                res.send({err:-1,msg:'添加失败'})
            }
        })
        .catch((err)=>{
			console.log(err)
            res.send({err:-880,msg:'内部错误请重试'})
        })
    })
	
    //商品删除
    /**
 * @api {post} /admin/project/del 菜品删除
 * @apiName del
 * @apiGroup project
 * 
 * @apiParam {String} _id
 * @apiParam {String} token  令牌
 * 
 * @apiSuccess {Number} err 错误码
 * @apiSuccess {String} msg 错误信息
 * @apiSuccess {Array} list 查询的数据
 */
	/*原版
    router.post('/del',(req,res)=>{
        let {_id}=req.body
        projectModel.deleteOne({_id:_id})//删除一个数据
        .then((data)=>{
            console.log(data)
            res.send({err:0,msg:'删除成功'})
        })
        // projectModel.deleteMany()//删除多一个数据
    })
	*/
	
	/*改版（get方式请求）*/
    router.get('/del',(req,res)=>{
        let {_id}=req.query
        projectModel.deleteOne({_id:_id})//删除一个数据
        .then((data)=>{
            console.log(data)
            res.send({err:0,msg:'删除成功'})
        })
        // projectModel.deleteMany()//删除多一个数据
    })
    //菜品的修改
    /**
 * @api {post} /admin/project/update 菜品修改
 * @apiName update
 * @apiGroup project
 * 
 * @apiParam {String} _id
 * @apiParam {String} name
 * @apiParam {String} desc
 * @apiParam {String} img
 * @apiParam {String} price
 * @apiParam {String} projecttype
 * @apiParam {String} token  令牌
 * 
 * @apiSuccess {Number} err 错误码
 * @apiSuccess {String} msg 错误信息
 * @apiSuccess {Array} list 查询的数据
 */
	/*原版
    router.post('/update',(req,res)=>{
        let {_id,name,desc,img,price,projecttype}=req.body
        projectModel.updateOne({_id:_id},{name,desc,img,price,projecttype})
        .then((data)=>{
            console.log(data)
            res.send({err:0,msg:"修改成功"})
        })
    })
	*/
	
	/*改版 使用react时改版（get方式请求）*/
    router.get('/update',(req,res)=>{
        let {_id,title,discount_price,img,price,intro,type,putaway}=req.query
        projectModel.updateOne({_id:_id},{title,discount_price,img,price,intro,type,putaway})
        .then((data)=>{
            console.log('修改',data)
            res.send({err:0,msg:"修改成功"})
        })
    })
/**
 * @api {post} /admin/project/findByTypePage 分类+分页查询
 * @apiName findByTypePage
 * @apiGroup project
 * 
 * @apiParam {String} projecttype 参数有：分页+分类 参数没有：分页查询
 * @apiParam {String} page
 * @apiParam {String} pageSize
 * @apiParam {String} token  令牌
 * 
 * @apiSuccess {Number} err 错误码
 * @apiSuccess {String} msg 错误信息
 * @apiSuccess {Array} list 查询的数据
 */
    //分类 分页汇总查询（原版 使用post方式请求）
	/*
    router.post('/findByTypePage',(req,res)=>{
        let {projecttype,page,pageSize}=req.body
        console.log({projecttype,page,pageSize})
        let typeSearch={}
        if(projecttype){
            typeSearch.projecttype=projecttype
        }
        let total=0
        projectModel.find(typeSearch)
        .then((data)=>{
            total=data.length
            return projectModel.find(typeSearch).skip((page-1)*pageSize).limit(Number(pageSize)).sort({price:1})//以价格进行排序(1表示正序，-1表示倒序)
        })
        .then((data)=>{
            res.send({err:0,msg:'查询成功',list:data,total:total})
        })
    })
	*/
    
	/*分类 分页汇总查询 使用react时改版（get方式请求）*/
	router.get('/findByTypePage',(req,res)=>{
        let {type,page,pageSize,putaway}=req.query
        let total=0
		let typeSearch={}
		let putawaySearch={}
		if(type||putaway){
			typeSearch.type=type
			putawaySearch.putaway=putaway
			console.log('分类查询',typeSearch,putawaySearch)
		}
        projectModel.find({$or:[typeSearch,putawaySearch]})
        .then((data)=>{
            total=data.length
            return projectModel.find({$or:[typeSearch,putawaySearch]}).skip((page-1)*pageSize).limit(Number(pageSize)).sort({discount_price:1})//以价格进行排序(1表示正序，-1表示倒序)
        })
        .then((data)=>{
            res.send({err:0,msg:'查询成功',list:data,total:total})
        })
    })
// 模糊查询1、接收关键字2、keyword
/**
 * @api {post} /admin/project/findByKw 通过关键字查询菜品信息
 * @apiName findByKw
 * @apiGroup project
 * 
 * @apiParam {String} kw 关键字
 * @apiParam {String} page 
 * @apiParam {String} pageSize 
 * @apiParam {String} token  令牌
 * 
 * @apiSuccess {Number} err 错误码
 * @apiSuccess {String} msg 错误信息
 * @apiSuccess {Array} list 查询的数据
 */
router.post('/findByKw',(req,res)=>{
    let {kw,page,pageSize}=req.body
    let reg=new RegExp(kw)
    projectModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})
    .then((data)=>{
        total=data.length
        return projectModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]}).skip((page-1)*pageSize).limit(Number(pageSize))
       
    })
    .then((data)=>{
         res.send({err:0,msg:'查询成功',list:data,total:total})
    })
})

//普通查询
/**
 * @api {post} /admin/project/find 普通查询
 * @apiName find
 * @apiGroup project
 * 
 * @apiParam {String} id  
 * @apiParam {String} token  令牌
 * 
 * @apiSuccess {Number} err 错误码
 * @apiSuccess {String} msg 错误信息
 * @apiSuccess {Array} list 查询的数据
 */
router.post('/find',(req,res)=>{
    let {_id}=req.body
    projectModel.find({_id:_id})
    .then((data)=>{
        res.send({err:0,msg:'查询成功',list:data})
    })
})

module.exports=router
