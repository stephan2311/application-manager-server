const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const companyModel = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    website: String,
    address: {
        street: String,
        city: String,
        zip: String,
        country: String,
    },
    contact: [{
        name: String,
        mail: String,
        phone: Number
    }],
});

module.exports = model('Company', companyModel);
