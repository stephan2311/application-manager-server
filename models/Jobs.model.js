const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const jobsModel = new Schema({
    url: String,
    title: String,
    company_name: String,
    company_logo: String,
    category: String,
    job_type: String,
    publication_date: Date,
    candidate_required_location: String,
    salary: String,
    description: String,
},
    { timestamps: true }
);

module.exports = model('Jobs', jobsModel);