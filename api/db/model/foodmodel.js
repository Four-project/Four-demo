const mongoose=require("mongoose")
const foodSchema=mongoose.Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
    img:{type:String,required:true},
    price:{type:String,required:true},
    foodtype:{type:String,required:true}
})
const FoodModel=mongoose.model("foods",foodSchema);
module.exports=FoodModel