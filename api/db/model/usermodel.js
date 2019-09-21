const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    tel:{type:String,required:true},
    num:{type:String,required:true},
    station:{type:String,required:true},
    type:{type:String,required:true},
    status:{type:String,required:true}
    
})
const UserModel=mongoose.model("user",userSchema);
module.exports=UserModel