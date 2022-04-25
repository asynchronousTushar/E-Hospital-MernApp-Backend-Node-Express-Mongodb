const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String
    },
    password: {
        type: String,
        required: true,
    }
})



const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;




