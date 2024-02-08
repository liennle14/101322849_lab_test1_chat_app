const mongoose = require('mongoose');   

const userSchema = new mongoose.Schema({
    username : {
        unique: true,
        type: String,
        required: true
    }, 
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    password : { 
        type: String,
        required: true
    },
    createon : {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;