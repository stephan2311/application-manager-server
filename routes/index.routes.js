const router = require("express").Router();
const authRoutes = require("./auth.routes");
const applicationRoutes = require("./application.routes");
const companyRoutes = require("./company.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/applications", applicationRoutes);
router.use("/companies", companyRoutes);

module.exports = router;
