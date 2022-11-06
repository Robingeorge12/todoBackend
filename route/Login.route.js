const { Router } = require("express")
const loginRouter = Router()
const { UserData } = require("../model/User.model")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


loginRouter.post("/", async (req, res) => {

    const { email, password } = req.body
    const uniqId = await UserData.findOne({ email: email })
    console.log(uniqId)
    if (uniqId) {

        const id = uniqId._id
        const new_email = uniqId.email
        const hash_pass = uniqId.password
        console.log(id)
        console.log(new_email)
        bcrypt.compare(password, hash_pass, async function (err, result) {
            if (err) {

                res.send({ msg: "failed to get token" })

            } if (result) {

                var token = jwt.sign({ ID: id, email: new_email }, 'masai');
                res.send({ "token": token })

            }
            else {

                res.send({ msg: "check entered details" })

            }


        });


    } else {

        res.send({msg:"signup first"})
    }
})

module.exports = { loginRouter }