const PlannerEvent = require('../models/PlannerEvent');

exports.addEvent = async (req, res) => {
  try {
    const { title, date, time } = req.body;
    const event = await PlannerEvent.create({ userId: req.user.userId, title, date, time });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add event' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await PlannerEvent.find({ userId: req.user.userId }).sort('date time');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get events' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { status, reminderTriggered } = req.body;
    let updateFields = {};
    if (status !== undefined) updateFields.status = status;
    if (reminderTriggered !== undefined) updateFields.reminderTriggered = reminderTriggered;

    const event = await PlannerEvent.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      updateFields,
      { new: true }
    );
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};
