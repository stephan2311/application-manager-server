const mongoose = require("mongoose");
const axios = require('axios');
const cron = require('node-cron');
const db = mongoose.connection;
const Jobs = require('../models/Jobs.model');

const MONGO_URI = require("../utils/consts");

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// cron.schedule('* 6,16 * * *', function () {
  console.log('Cron job running');
  axios.get('https://remotive.io/api/remote-jobs?limit=50')
    .then(function (response) {
      onSuccess(response)
    })
    .catch(function (error) {
      console.log(error);
    });

  function onSuccess(response) {
    let jobsArray = response.data.jobs;
    let arrayLength = Object.keys(jobsArray).length
    console.log(arrayLength)
    for (let i = 0; i < arrayLength; i++) {
      let url = jobsArray[i].url;
      let title = jobsArray[i].title;
      let company_name = jobsArray[i].company_name;
      let company_logo = jobsArray[i].company_logo;
      let category = jobsArray[i].category;
      let job_type = jobsArray[i].job_type;
      let publication_date = jobsArray[i].publication_date;
      let candidate_required_location = jobsArray[i].candidate_required_location;
      let salary = jobsArray[i].salary;
      let description = jobsArray[i].description;
      console.log(title + " " + company_name);

      assignDataValue(url, title, category, company_name, company_logo, job_type, publication_date, candidate_required_location, salary, description)
    }
  }

  function assignDataValue(url, title, category, company_name, company_logo, job_type, publication_date, candidate_required_location, salary, description) {

    let upData = new Jobs()
    upData.url = url;
    upData.title = title;
    upData.company_name = company_name;
    upData.company_logo = company_logo;
    upData.category = category;
    upData.job_type = job_type;
    upData.publication_date = publication_date;
    upData.candidate_required_location = candidate_required_location;
    upData.salary = salary;
    upData.description = description;

    upData.save();
  }

// });