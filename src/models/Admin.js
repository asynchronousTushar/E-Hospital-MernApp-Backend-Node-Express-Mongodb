const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

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

adminSchema.methods.toJSON = function () {
    const admin = this;
    let adminObject = admin.toObject();

    delete adminObject.password

    return adminObject;
}

adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email })

    if (!admin) {
        throw new Error('Admin not found');
    }

    const isMatch = await bcryptjs.compare(password, admin.password)

    if (!isMatch) {
        throw new Error("password not matched")
    }

    return admin;
}

adminSchema.pre("save", async function (next) {
    const admin = this;

    if (admin.isModified('password')) {
        admin.password = await bcryptjs.hash(admin.password, 8);
    }

    next();
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;




