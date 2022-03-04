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
});

module.exports = model('Company', companyModel);
