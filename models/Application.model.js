const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const applicationModel = new Schema(
    {
        position: {
            type: String,
            required: true
        },
        dateApplied: {
            type: Date,
            default: Date.now
        },
        job_post_url: String,
        channel: {
            type: String,
            enum: ["Personal Intro/Recommendation", "Mail", "LinkedIn", "Website", "Others"],
            required: true
        },
        status: {
            type: String,
            enum: ["submitted", "pending", "reminder", "offer", "rejected"],
            default: "submitted",
            required: true
        },
        company: {type: Schema.Types.ObjectId, ref: 'Company'}
    },
    {
        timestamps: true,
    }
);

module.exports = model('Application', applicationModel);
