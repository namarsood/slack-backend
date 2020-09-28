
const mongoose = require('mongoose');

const workplaceSchema = new mongoose.Schema({
    createdBy: { type: Date },
    name: { type: String },
    description: { type: String },
    logo: { type: String },
    members: [{
        id: { type: mongoose.Schema.ObjectId, ref: 'workplace'},
    }],
}, {
        timestamps: true
    });

module.exports = mongoose.model('workplace', workplaceSchema);