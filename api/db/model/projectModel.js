//创建scheme对象
const mongoose=require('mongoose')
const ProjectSchema=mongoose.Schema({
    title:{type:String,required:true},
    intro:{type:String,required:true},
    img:{type:String,required:true},
	type:{type:String,required:false},
    price:{type:Number,required:true},
    discount_price:{type:Number,required:true},
	putaway:{type:String,required:false},
	detail:{type:Array,requrired:false}
})
const ProjectModel=mongoose.model('projects',ProjectSchema)
module.exports=ProjectModel