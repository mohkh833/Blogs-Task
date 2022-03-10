const User = require("../models/user")
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

exports.register = async(req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        imgUrl: req.body.imgUrl,
    }
    try{
        const email = await User.findAll({
            where: {email:req.body.email}
        })
        if(email.length == 0){
            const savedUser = await User.create(newUser)
            res.status(201).json(savedUser)
        } else {
            res.status(403).json("Email used before try another email")
        }
    } 
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
}

exports.login = async(req, res) => {
    try{
        const user = await User.findOne({
            where: {email: req.body.email}
        })
        if(!user){
            res.status(404).json("User Cannot be found")
            return
        } 
        else {
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
            const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

            if (orginalPassword !== req.body.password) {
                res.status(401).json("Wrong Credentials")
            } 
            else {
                const accessToken = jwt.sign({
                    id: user.id,
                    isAdmin: user.isAdmin
                },
                    process.env.JWT_SEC,
                    {expiresIn:"3d"}
                )
                
                const {password, ...other} = user
                res.status(200).json({...other.dataValues, accessToken})
            }
        }
    }catch(err){
        res.status(500).json(err)
    }
}