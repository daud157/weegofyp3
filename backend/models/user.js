const { Schema, model } = require('mongoose');

const driverProfileSchema = new Schema({
    licenseNumber: {
        type: String,
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    currentProfileStatus:{
            type:String,
            enum:['driver','passenger'],
        },
    isDriver: {
        type: Boolean,
        default: false,
    },
    driverProfile: {
        type: driverProfileSchema,
        default: null,
    },
});

const User = model('User', userSchema);

module.exports = User;
