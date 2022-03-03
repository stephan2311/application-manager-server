const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const companyModel = new Schema({
    name: {
        type: String,
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
    applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }]
});

module.exports = model('Task', companyModel);
