const Contact = require('../models/Contact');

exports.addContact = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const contact = await Contact.create({ userId: req.user.userId, name, phone });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add contact' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.userId });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get contacts' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};
