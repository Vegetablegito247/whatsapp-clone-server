const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;