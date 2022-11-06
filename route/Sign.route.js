require('dotenv').config()
const { Router } = require("express")
const signupRouter = Router()
const { UserData } = require("../model/User.model")
const bcrypt = require('bcrypt');

signupRouter.post("/", async (req, res) => {

    const { email, password, name } = req.body

    const checkEmail = await UserData.findOne({ email: email })
    console.log(checkEmail)
    if (checkEmail) {
        res.send({ msg: "User Email exist , go  and login" })
    }
    else {

        bcrypt.hash(password, 4, async function (err, hashed_pass) {

            if (err) {

                res.send({ msg: "can't signup, try again" })

            } else {
                const new_user = new UserData({
                    email,
                    password: hashed_pass,
                    name
                })
                try {

                    await new_user.save()
                    res.send({ "msg": "signup successfully" })

                } catch (er) {

                    res.send({ "msg": "something went wrong" })
                }

            }

        });


    }



})

module.exports = { signupRouter }