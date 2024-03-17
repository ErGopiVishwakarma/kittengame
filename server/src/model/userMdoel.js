const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type:String,default:''},
    defuseCards:[],
    deck:[],
    currentCard:{type:String, default:''},
    score:{type:Number, default:''}
},
{
    timestamps:true 
})

const UserMdoel = mongoose.model('user',userSchema)

module.exports = UserMdoel
