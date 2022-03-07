const router = require("express").Router();
const Application = require("../models/Application.model");
const Company = require('../models/Company.model');
const mongoose = require('mongoose');

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

router.put('/:companyId', (req, res, next) => {
    const { companyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Company.findByIdAndUpdate(companyId, req.body, { new: true })
        .then((updatedCompany) => res.json(updatedCompany))
        .catch(error => res.json(error));
});

router.post("/", (req, res) => {

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


router.delete('/:companyId', (req, res, next) => {
    const { companyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Company.findByIdAndRemove(companyId)
        .then(() => res.json({ message: `Company with ID ${companyId} is removed successfully.` }))
        .catch(error => res.json(error));
});

module.exports = router;