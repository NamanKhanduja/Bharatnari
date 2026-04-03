const Alert = require('../models/Alert');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Simple audio upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

exports.uploadMiddleware = upload.single('audio');

exports.createAlert = async (req, res) => {
  try {
    const { latitude, longitude, status } = req.body;
    const audioMessage = req.file ? req.file.path : null;

    const alert = await Alert.create({
      userId: req.user.userId,
      location: { latitude, longitude },
      audioMessage,
      status: status || 'active'
    });

    const contacts = require('../models/Contact');
    const userContacts = await contacts.find({ userId: req.user.userId });
    
    userContacts.forEach(contact => {
      console.log(`\n--- SIMULATED SMS TO ${contact.name} (${contact.phone}) ---`);
      console.log(`Emergency Alert! User needs help.`);
      console.log(`Location: https://maps.google.com/?q=${latitude},${longitude}`);
      console.log(`-----------------------------------------\n`);
    });

    res.status(201).json(alert);
  } catch (error) {
    console.error('Alert creation error:', error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ userId: req.user.userId }).sort('-createdAt');
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get alerts' });
  }
};
