const router = require("express").Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Jobs.find()
        .then(allJobs => res.json(allJobs))
        .catch(err => res.json(err));
});

module.exports = router;