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
        default: 'https://www.dinneratthezoo.com/wp-content/uploads/2018/06/shrimp-alfredo-6.jpg'
    },
    coverPicture: {
        type: String,
        default: 'https://www.dinneratthezoo.com/wp-content/uploads/2018/06/shrimp-alfredo-6.jpg'
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