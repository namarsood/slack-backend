
const mongoose = require('mongoose');

const channelMessageSchema = new mongoose.Schema({

    channelId: { type: mongoose.Schema.ObjectId, ref: 'channel'},
    fromUserId: {type: mongoose.Schema.ObjectId, ref: 'user'},
    text: {type: String},
    status: {type: String, enum: [1,2,3]}, // 1: sent, 2: delivered, 3: read
    sentAt: {type: Date},
    deliveredAt: {type: Date},
    readtAt: {type: Date},
    thread: [
        {
            fromUserId: {type: mongoose.Schema.ObjectId, ref: 'user'},
            text: {type: String},
            status: {type: String, enum: [1,2,3]}, // 1: sent, 2: delivered, 3: read
            sentAt: {type: Date},
            deliveredAt: {type: Date},
            readtAt: {type: Date},   
        }
    ],
}, {
        timestamps: true
    });

module.exports = mongoose.model('channelmessage', channelMessageSchema);