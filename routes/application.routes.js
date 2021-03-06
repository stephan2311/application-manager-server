const router = require("express").Router();
const Application = require("../models/Application.model");
const Company = require("../models/Company.model");
const User = require("../models/User.model");
const mongoose = require('mongoose');
const {isAuthenticated} = require('../middleware/jwt.middleware');
// const { canViewApplication } = require("../middleware/user.middleware");


router.get('/', isAuthenticated, (req, res, next) => {

    const userId = req.payload._id;
 
    Application.find({user: userId})
        .populate("company")
        .populate("user")
        .then(allApplications => {
            console.log(allApplications)
            res.json(allApplications)})
        .catch(err => res.json(err));
});

router.get('/:applicationId', isAuthenticated, (req, res, next) => {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Application.findById(applicationId)
        .then(application => res.status(200).json(application))
        .catch(error => res.json(error));
});

router.put('/:applicationId', isAuthenticated, (req, res, next) => {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Application.findByIdAndUpdate(applicationId, req.body, { new: true })
        .then((updatedApplication) => res.json(updatedApplication))
        .catch(error => res.json(error));
});

router.post("/", isAuthenticated, (req, res) => {

    const userId = req.payload._id;
    
    const applicationDetails = {
        position: req.body.position,
        dateApplied: req.body.dateApplied,
        job_post_url: req.body.job_post_url,
        channel: req.body.channel,
        status: req.body.status,
        company: req.body.company,
        contact: req.body.contact,
        comment: req.body.comment,
        user: userId
    }

    let applicationCreated;

    Application.create(applicationDetails)
        .then(newApplication => {
            applicationCreated = newApplication;
            return User.findByIdAndUpdate(userId, { $push: { applications: newApplication._id } });
        })
        .then(() => res.status(201).json(applicationCreated) )
        .catch(err => {
            console.log("error creating a new application", err);
            res.status(500).json({
                message: "error creating a new application",
                error: err
            });
        })

})


router.delete('/:applicationId', isAuthenticated, (req, res, next) => {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Application.findByIdAndRemove(applicationId)
        .then(() => res.json({ message: `Application with ID ${applicationId} is removed successfully.` }))
        .catch(error => res.json(error));
});

module.exports = router;