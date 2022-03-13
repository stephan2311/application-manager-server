const router = require("express").Router();
const mongoose = require('mongoose');
const Jobs = require('../models/Jobs.model');
const nodeCron = require("node-cron");


const job = nodeCron.schedule("* 10,14 * * *", () => {
    router.get('/', (req, res, next) => {
        Jobs.find()
            .then(allJobs => res.json(allJobs))
            .catch(err => res.json(err));
    }); console.log(new Date().toLocaleString());
});


module.exports = router;