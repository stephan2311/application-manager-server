const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const applicationModel = new Schema(
    {
        position: {
            type: String,
            required: true
        },
        applied: Date,
        channel:["Personal Intro/Recommendation", "Mail", "LinkedIn", "Website", "Others"],
        status: ["submitted", "pending", "reminder", "offer", "rejected"],
        company: { type: Schema.Types.ObjectId, ref: 'Company' }
    },
    {
        timestamps: true,
    }
);

module.exports = model('Task', applicationModel);
