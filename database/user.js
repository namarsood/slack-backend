
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    countryCode: { type: String },
    userName: {type: String},
    about: {type: String},
    workplaces: [{
        id: { type: mongoose.Schema.ObjectId, ref: 'workplace'},
    }],
}, {
        timestamps: true
    });

module.exports = mongoose.model('user', userSchema);