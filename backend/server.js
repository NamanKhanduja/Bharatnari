const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup simple route
app.get('/', (req, res) => {
    res.send('BharatNari API is running');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const alertRoutes = require('./routes/alertRoutes');
const contactRoutes = require('./routes/contactRoutes');
const plannerRoutes = require('./routes/plannerRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/planner', plannerRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    
    // Planner Event Cron Reminder System 
    const nodemailer = require('nodemailer');
    const PlannerEvent = require('./models/PlannerEvent');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    setInterval(async () => {
      try {
        const events = await PlannerEvent.find({ reminderTriggered: false, status: 'pending' }).populate('userId');
        const now = new Date();
        
        for (const event of events) {
          if (!event.userId || !event.userId.email) continue;
          
          const eventTime = new Date(`${event.date}T${event.time}`);
          if (isNaN(eventTime)) continue;
          
          const diffHours = (eventTime - now) / (1000 * 60 * 60);
          if (diffHours > 0 && diffHours <= 2.0) {
            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: event.userId.email,
              subject: 'Reminder: Upcoming Event',
              text: `You have an upcoming event in 2 hours.\n\nEvent: ${event.title}\nTime: ${event.date} at ${event.time}`
            };
            
            await transporter.sendMail(mailOptions);
            event.reminderTriggered = true;
            await event.save();
            console.log(`[CRON] Sent email reminder for event '${event.title}' to ${event.userId.email}`);
          }
        }
      } catch (err) {
        console.error('[CRON ERROR]', err.message);
      }
    }, 60000); // Run strictly every 1 minute

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    console.log('Waiting for MongoDB URI. Please update the .env file with your valid MONGODB_URI.');
  });
