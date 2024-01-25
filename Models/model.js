const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{type:String,required:true},
    pass:{type:String,required:true},
    email:{type:String,required:true},
    age:{type:Number,required:true},
},{
    versionKey:false
})

const UserModel = mongoose.model("tododata",userSchema)
module.exports = {
    UserModel
}