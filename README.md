# 🛡️ BharatNari: Women's Safety Platform

![BharatNari Hero](https://via.placeholder.com/1200x400/2563eb/ffffff?text=BharatNari+Safety+Platform)

**BharatNari** is a full-stack, premium safety companion designed to empower women with real-time emergency tools, automated reminders, and practical safety utilities. Built with a focus on reliability, simplicity, and a modern SaaS aesthetic.

---

## 🚀 Key Features

### 🚨 SOS Emergency System
- **One-Touch Emergency**: Instantly captures geolocation and records 10s of audio.
- **Trusted Notify**: Simulates SMS alerts to emergency contacts with a Google Maps link.
- **Offline Reliability**: Alerts are cached locally if internet is unavailable and automatically synced when back online.
- **Precaution Share**: A discrete button to share location with contacts without triggering full SOS.

### 🔐 Advanced Authentication
- **Dual-Mode Login**: Supports secure password-based login for returning users and Email OTP for first-time setup.
- **Security First**: Passwords are encrypted using high-entropy `bcryptjs` hashing.

### 📅 Smart Daily Planner
- **Calendar-Based Tasks**: Efficiently schedule safety plans and daily routines.
- **Backend Reminders**: An automated server-side scanner (Cron) monitors upcoming events and sends email reminders through Nodemailer precisely 2 hours before the task.

### 🧰 Safety Utilities
- **Fake Call Simulator**: Realistic incoming call screen to exit uncomfortable situations.
- **Sound Detection**: Ambient volume monitoring that prompts for an SOS alert if a sudden loud noise is detected.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Lucide-Icons, Vanilla CSS (Premium Theme)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Authentication**: JWT, bcryptjs, OTP-via-Email
- **Emailing**: Nodemailer (Gmail SMTP)

---

## 📦 Installation & Setup

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account
- Gmail App Password (for Nodemailer)

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```
Run the server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
Run the development server:
```bash
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/send-otp` | Sends login OTP to email |
| `POST` | `/api/auth/verify-otp` | Verifies OTP and handles registration |
| `POST` | `/api/auth/login-password` | Standard password login |
| `POST` | `/api/alerts` | Triggers a new SOS/Precaution alert |
| `GET` | `/api/planner` | Relevates scheduled events |
| `POST` | `/api/contacts` | Adds a new trusted contact |

---

## 🎨 UI Design
BharatNari follows a **Premium SaaS aesthetic**:
- **Palette**: Clean white backgrounds with vibrant `#2563eb` action accents.
- **Typography**: Modern, readable Sans-Serif (Outfit / Inter).
- **UX**: Smooth transitions, hover elevations, and responsive grid layouts.

---

## 📄 License
This project is for educational and safety purposes. 

Designed and developed with 💙 for Women's Safety.
