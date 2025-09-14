const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
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
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/djwv8n9zq/image/upload/v1674953253/ProfilePic/ProfilePic_default.jpg'
    },
    coverPicture: {
        type: String,
        default: 'https://res.cloudinary.com/djwv8n9zq/image/upload/v1674953253/ProfilePic/ProfilePic_default.jpg'
    },
    bio: {
        type: String,
        default: 'Hey there, I am a cyber security expert',
        max: 160
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    isOnline: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', usersSchema);
module.exports = User;