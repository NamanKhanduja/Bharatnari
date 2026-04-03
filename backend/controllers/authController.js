const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    
    await OTP.create({ email, otp });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP for BharatNari login is: ${otp}\nThis OTP is valid for 5 minutes.`
    };

    await transporter.sendMail(mailOptions);
    console.log(`[EMAIL] Sent OTP to ${email}`);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ error: 'Failed to send OTP. Try again' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) return res.status(400).json({ error: 'OTP expired. Request new one' });

    await OTP.deleteOne({ _id: validOtp._id });

    // Check if user exists AND has a password
    let user = await User.findOne({ email });
    if (!user || !user.password) {
       // Flag to frontend to ask for password creation
       return res.status(200).json({ message: 'OTP Verified', isNewUser: true, email });
    }

    // Returning user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

exports.setPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, password: hashedPassword });
    } else {
      user.password = hashedPassword;
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user, message: 'Password set and logged in' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to set password' });
  }
};

exports.loginPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ error: 'User not found or password not set' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};
