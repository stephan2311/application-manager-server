const router = require("express").Router();
const Application = require("../models/Application.model");
const Company = require('../models/Company.model');
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');


router.get('/', (req, res, next) => {
    Company.find()
        .then(allCompanies => res.json(allCompanies))
        .catch(err => res.json(err));
});


router.get('/:companyId', (req, res, next) => {
    const { companyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Company.findById(companyId)
        .then(company => res.status(200).json(company))
        .catch(error => res.json(error));
});

router.put('/:companyId', isAuthenticated, (req, res, next) => {
    const { companyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Company.findByIdAndUpdate(companyId, req.body, { new: true })
        .then((updatedCompany) => res.json(updatedCompany))
        .catch(error => res.json(error));
});

router.post("/", isAuthenticated, (req, res) => {

    const companyDetails = {
        name: req.body.name,
        website: req.body.website,
        address: req.body.address,
    }

    Company.create(companyDetails)
        .then(newCompany => {
            res.status(201).json(newCompany)
        })
        .catch(err => {
            console.log("error creating a new company", err);
            res.status(500).json({
                message: "error creating a new company",
                error: err
            });
        })

})


router.delete('/:companyId', isAuthenticated, (req, res, next) => {
    const { companyId } = req.params;
    let allApplications;

    console.log("Entered Route")

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    console.log("Step 2")

    Application.find({ company: companyId })
        .then(responseFromDB => {
            allApplications = responseFromDB
            
            if (responseFromDB.length === 0) {
                console.log(allApplications)
                return Company.findByIdAndRemove(companyId);
            } else {
                throw new Error("Can not delete a company if it has applications")
            }
        })
        .then( (companyId) => {
            res.json({ message: `Company with ID ${companyId} is removed successfully.` })
        })
        .catch(err => res.status(500).json({
            message: "error deleting a company, make sure theres no applications for that company",
            error: err
        }));
});

module.exports = router;