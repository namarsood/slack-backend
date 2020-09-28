
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    user1: { type: mongoose.Schema.ObjectId, ref: 'user'},
    user2: { type: mongoose.Schema.ObjectId, ref: 'user' },
    visibleTo: [{type: mongoose.Schema.ObjectId, ref: 'user'}],
    workplaceId: {type: mongoose.Schema.ObjectId, ref: 'workplace'},
}, {
        timestamps: true
    });

module.exports = mongoose.model('conversation', conversationSchema);