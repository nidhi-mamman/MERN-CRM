const Job = require("../models/job");

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.send({
      Statuscode: 1,
      Msg: "Jobs fetched successfully",
      Data: jobs,
    });
  } catch (error) {
    res.send({
      Statuscode: 0,
      Msg: "Error fetching jobs",
      Error: error.message,
    });
  }
};

const createJob = async (req, res) => {
  const {
    title,
    company,
    location,
    type,
    description,
    requirements,
    salary,
    applyLink,
    postedBy,
  } = req.body;

  if (!title || !company || !description) {
    return res.send({
      Statuscode: 2,
      Msg: "Title, company and description are required",
    });
  }

  try {
    const newJob = new Job({
      title,
      company,
      location,
      type,
      description,
      requirements,
      salary,
      applyLink,
      postedBy,
    });

    await newJob.save();

    res.send({
      Statuscode: 1,
      Msg: "Job created successfully",
      Data: newJob,
    });
  } catch (error) {
    res.send({
      Statuscode: 0,
      Msg: "Error creating job",
      Error: error.message,
    });
  }
};

module.exports = { getJobs, createJob };
