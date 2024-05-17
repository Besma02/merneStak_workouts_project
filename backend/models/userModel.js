const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt=require('bcrypt')
const validator=require('validator')
const userSchema=new Schema({
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
})
userSchema.statics.signup=async function(email,password){
    if(!email || !password){
        throw Error("all fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("email must be valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("password should be strong enough")
    }
    const exists=await this.findOne({email})

    if(exists){
        throw Error("email already in use")
    }
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    const user=await this.create({email,password:hash})
    return user
}
userSchema.statics.login=async function(email,password){
    if(!email || !password){
        throw Error("all fields must be filled")
    }
    const user=await this.findOne({email})
    if(!user){
        throw Error("incorrect email")
    }
    const match=await bcrypt.compare(password,user.password)
    if(!match){
        throw Error("incorrect password")
    }
    return user
}
const User=mongoose.model('user',userSchema)
module.exports=User