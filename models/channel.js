
const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    visibility: { type: String, enum: ["PUBLIC", "PRIVATE"] },
    name: { type: String },
    phone: { type: String },
    description: { type: String },
    members: [{
        id: { type: mongoose.Schema.ObjectId, ref: 'user'},
    }],
    workplaceId: { type: mongoose.Schema.ObjectId, ref: 'workplace'},
}, {
        timestamps: true
    });

module.exports = mongoose.model('channel', channelSchema);