const express = require("express");
const eventController = require("../controllers/event");

const router = express.Router();

router.get("/events", eventController.getEvents);
router.post("/events", eventController.createEvent);

module.exports = router;
