const router = require("express").Router();
const mongoose = require('mongoose');
const Jobs = require('../models/Jobs.model');
const dbUpdate = require('node-cron');
const axios = require('axios');
const MONGO_URI = require('../utils/consts')


router.get('/', (req, res, next) => {
    Jobs.find()
        .then(allJobs => res.json(allJobs))
        .catch(err => res.json(err));
});


module.exports = router;