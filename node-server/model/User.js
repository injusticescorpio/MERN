const mongoose = require('mongoose')

const User=new mongoose.Schema({
    name:{type: 'string', required: true},
    email:{type: 'string', required: true,unique:true},
    password:{type: 'string', required: true},
    quote:{type: 'string'}
})

const userModel = mongoose.model('UserModel', User);

module.exports = userModel;