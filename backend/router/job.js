const express = require("express");
const jobController = require("../controllers/job");

const router = express.Router();

router.get("/jobs", jobController.getJobs);
router.post("/jobs", jobController.createJob);

module.exports = router;
