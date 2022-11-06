const {TodoData} = require("../model/Todo.model")
const {authenticate} = require("../middleware/authentication")
const {Router} = require("express")
const noteRouter = Router()

noteRouter.get("/",authenticate, async (req,res)=>{

const {email} = req.body
console.log(email)
const todoList = await TodoData.find({email})
res.send({msg : todoList})

})

noteRouter.post("/create",authenticate, async (req,res)=>{

    console.log(req.body)
    const {email,title,id,status} = req.body
    const savedTodo = new TodoData({

        title,
        status,
        id,
        email

    })
    await savedTodo.save()
//const data = await TodoData.insertMany(req.body)
res.send({msg:"todo created"})

})
 
noteRouter.put("/edit/:id",authenticate, async (req,res)=>{

const {id} = req.params
//console.log(id)

const data = await TodoData.updateOne({id:id},{$set :{status : true}})
res.send({msg:data})

})

noteRouter.put("/del/:id",authenticate, async (req,res)=>{

    const {id} = req.params
    //console.log(id)
    
    const data = await TodoData.deleteOne({id:id})
    res.send({msg:"data deleted"})
    
    })

module.exports = {noteRouter}