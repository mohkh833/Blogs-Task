const User = require("../models/user")
const CryptoJS = require("crypto-js");

exports.updateUser = async(req, res) => {
    let {name, email, password, imgUrl} = req.body
    let {id} = req.params
    if (password) {
        password = CryptoJS.AES.encrypt(
            password,
            process.env.PASS_SEC
        ).toString()
    }
    try{

        const Searched_email = await User.findAll({
            where: {email:email}
        })

        if(Searched_email.length == 0){
            if(password){
                let updateUser = await User.update({name,email,password,imgUrl},{
                    where:{id:id}
                })

                updateUser = await User.findOne({where:{id:id}})
                res.status(200).json(updateUser)

            } else{
                let updateUser = await User.update({name,email},{
                    where:{id:id}
                })
                updateUser = await User.findOne({where:{id:id}})
                res.status(200).json(updateUser)
            }
        }
        else {
            res.status(403).json("Email used before try another email")
        }
    }
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
}

exports.getUserById = async(req, res) => {
    let {id} = req.params
    try{
        const user = await User.findOne({where:{id:id}})
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.getAllUsers = async(req, res) => {
    try{
        const users = await User.findAll()
        res.status(200).json(users)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.deleteUserByid = async(req, res) => {
    let {id} = req.params
    try{
        const deleteUser = await User.destroy({
            where: {id}
        })
        res.status(200).json("deleted successfully")
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}