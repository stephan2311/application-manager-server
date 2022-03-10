const router = require("express").Router();
const authRoutes = require("./auth.routes");
const applicationRoutes = require("./application.routes");
const companyRoutes = require("./company.routes");
const jobsRoutes = require("./jobs.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/account/applications", applicationRoutes);
router.use("/companies", companyRoutes);
router.use("/jobs", jobsRoutes);

module.exports = router;
