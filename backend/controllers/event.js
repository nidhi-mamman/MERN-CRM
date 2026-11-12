const Event = require("../models/event");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.send({
      Statuscode: 1,
      Msg: "Events fetched successfully",
      Data: events,
    });
  } catch (error) {
    res.send({
      Statuscode: 0,
      Msg: "Error fetching events",
      Error: error.message,
    });
  }
};

const createEvent = async (req, res) => {
  const { title, description, date, time, location, capacity, type, createdBy } = req.body;

  if (!title || !date) {
    return res.send({
      Statuscode: 2,
      Msg: "Title and date are required",
    });
  }

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      capacity,
      type,
      createdBy,
    });

    await newEvent.save();

    res.send({
      Statuscode: 1,
      Msg: "Event created successfully",
      Data: newEvent,
    });
  } catch (error) {
    res.send({
      Statuscode: 0,
      Msg: "Error creating event",
      Error: error.message,
    });
  }
};

module.exports = { getEvents, createEvent };
