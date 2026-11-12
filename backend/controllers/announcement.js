const Announcement = require("../models/announcement");

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });

    res.send({
      Statuscode: 1,
      Msg: "Announcements fetched successfully",
      Data: announcements,
    });
  } catch (error) {
    res.send({
      Statuscode: 0,
      Msg: "Error fetching announcements",
      Error: error.message,
    });
  }
};

const getLatestAnnouncement = async (req, res) => {
  try {
    const latest = await Announcement.findOne().sort({ createdAt: -1 });

    res.send({
      Statuscode: 1,
      Msg: "Latest announcement fetched successfully",
      Data: latest,
    });
  } catch (error) {
    res.send({
      Statuscode: 0,
      Msg: "Error fetching latest announcement",
      Error: error.message,
    });
  }
};

const createAnnouncement = async (req, res) => {
  const { title, body, category, author } = req.body;

  if (!title || !body) {
    return res.send({
      Statuscode: 2,
      Msg: "Title and message are required",
    });
  }

  try {
    const newAnnouncement = new Announcement({
      title,
      body,
      category: category || "General",
      author: author || "Admin",
    });

    await newAnnouncement.save();

    res.send({
      Statuscode: 1,
      Msg: "Announcement created successfully",
      Data: newAnnouncement,
    });
  } catch (error) {
    res.send({
      Statuscode: 0,
      Msg: "Error creating announcement",
      Error: error.message,
    });
  }
};

module.exports = { getAnnouncements, getLatestAnnouncement, createAnnouncement };
