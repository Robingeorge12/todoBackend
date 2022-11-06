const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    title:{type:String, required:true},
    status:{type:Boolean , required:true},
   email:{type:String ,required:true},
    id:{type:String ,required:true}
})

const TodoData = mongoose.model("todo",TodoSchema)

module.exports = {TodoData}