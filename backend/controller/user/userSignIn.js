const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModels')
const jwt = require('jsonwebtoken')

async function userSignInController(req,res) {
    try {
        const {email, password} = req.body

        if(!email){
            throw new Error("Please Provide Email")
        }

        if(!password){
            throw new Error("Please Provide Password")
        }

        const user = await userModel.findOne({email})

        if(!user){
            throw new Error("User Not Found!");
        }

        const checkPassword = await bcrypt.compare(password,user.password)

        if(checkPassword){
            const tokenData = {
                _id : user._id,
                email : user.email,
            }

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly : true,
                secure : true,
                sameSite : 'None'
            }

            res.cookie("token",token,tokenOption).status(200).json({
                message : "Login Successful!",
                data : token,
                success : true,
                error : false
            })
        }else{
            throw new Error("Please Check Password!");
        }

    } catch (err) {
        res.json({
            message : err.message || err,
            error : true,
            success : false
        }) 
    }
}

module.exports = userSignInController