const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    statusFormat: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    viewedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;