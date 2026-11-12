const express = require("express");
const announcementController = require("../controllers/announcement");

const router = express.Router();

router.get("/announcements", announcementController.getAnnouncements);
router.get("/announcements/latest", announcementController.getLatestAnnouncement);
router.post("/announcements", announcementController.createAnnouncement);

module.exports = router;
