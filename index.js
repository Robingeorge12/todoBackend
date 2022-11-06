require('dotenv').config()
const express = require("express")
const app = express()
const  {connection} = require("./db")
const {signupRouter} = require("./route/Sign.route")
const { loginRouter } = require("./route/Login.route")
const {noteRouter} = require("./route/Notes.route")
app.use(express.json())


app.use("/sign",signupRouter)
app.use("/login",loginRouter)
app.use("/todos",noteRouter)

app.listen(process.env.PORT,async ()=>{
try{
    await connection
    console.log("connected")
}catch(er){
    console.log("error occured")
}

    console.log("PORT 5600")
})