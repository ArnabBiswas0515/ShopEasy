const userModel = require("../../models/userModels")
const bcrypt = require('bcryptjs');

async function userSignUpController(req,res) {
    try {
        const {email, password, name} = req.body

        const user = await userModel.findOne({email})

        console.log("user",user)

        if(user){
            throw new Error("Email Already in Use");
        }

        if(!email){
            throw new Error("Please Provide Email")
        }

        if(!password){
            throw new Error("Please Provide Password")
        }

        if(!name){
            throw new Error("Please Provide Username")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Hashing Error...");
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }
        
        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "Account Created Successfully!"
        })

    } catch (err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = userSignUpController