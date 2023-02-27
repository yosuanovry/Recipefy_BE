const {findUser,createUser,selectUserById, verifyUser, selectData} = require('./../models/authModel')
const {v4:uuidv4} = require('uuid')
const argon2 = require('argon2');
const generateToken = require('../helpers/generateToken')
const email = require("../middleware/email")

const UsersController = {
    registerUser: async (req,res,next)=>{
        if(!req.body.email || !req.body.password || !req.body.name){
            return res.status(404).json({status:404,message:`masukan data yang benar`})
        }

        let {rows:[users]} = await findUser(req.body.email)

        let role = req.params.role

        if(users){
            return res.status(401).json({status:401,message:`email sudah terdaftar silakan login`})
        }

        let id = uuidv4()
        let otp =  Math.floor(100000 + Math.random() * 900000)

        let data = {
            id,
            email: req.body.email,
            password: await argon2.hash(req.body.password),
            fullname: req.body.name,
            role,
            otp
        }

        let register = await createUser(data)
        
        if(!register){
            return res.status(401).json({status:401,message:`register gagal`})
        }

        try{
            let url = `http://${process.env.BASE_URL}:${process.env.PORT}/auth/otp/${id}/${otp}`
            let sendEmail =  email(req.body.email,otp,url,req.body.name)
            if(sendEmail == 'email not send'){
                return res.status(404).json({status:404,message:`register gagal, email tidak terkirim`})                
            }
            return res.status(201).json({status:201,message:`register berhasil, please check your email`})                
        } catch(error){
            console.log('reg gagal',error)
            return res.status(404).json({status:404,message:`register gagal`})                
        }
    },
    loginUser: async (req,res,next)=>{

        if(!req.body.email || !req.body.password){
            return res.status(404).json({status:404,message:`masukan data yang benar`})
        }

        let {rows:[users]} =await findUser(req.body.email)

        if(!users){
            return res.status(404).json({status:404,message:`login gagal, password atau email salah`})       
        }

        let verifyPassword = await argon2.verify(users.password,req.body.password)

        let data = users
        delete data.password

        let token = generateToken(data)
        
        if(verifyPassword){
            users.token = token
            delete users.password
            delete users.otp
            delete users.created_at

            console.log('verif', users.verif)

            if(data.verif == 0){
                return res.status(404).json({status:404,message:`login gagal silakan cek email untuk verifikasi user`})   
            }
            
            return res.status(200).json({status:200,message:`login berhasil`,data:users})        
        }

        return res.status(404).json({status:404,message:`login gagal`})       
    },
    otp: async (req,res,next)=>{
        let userId = req.params.id
        let otpUser = req.params.code
        

        if(!userId || !otpUser){
            return res.status(404).json({status:404,message:`masukan otp yang benar`})
        }

        let {rows:[users]} =await selectUserById(userId)

        if(!users){
            return res.status(404).json({status:404,message:`user tidak ditemukan`})
        }
        

        if(users.otp == otpUser){
            let verif =  await verifyUser(userId)
            if(verif){
                return res.status(201).json({status:201,message:`user berhasil diverifikasi, silahkan login`})
            } else {
                return res.status(404).json({status:404,message:`user tidak berhasil diverifikasi`})
            }
        } else {
            return res.status(404).json({status:404,message:`otp user salah`})
        }

    }
}

module.exports = UsersController