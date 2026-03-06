# BharatNari - Women Safety Platform

A comprehensive women-safety mobile application with real-time location tracking, emergency alerting, AI-powered distress detection, and trusted-contact coordination.

## Core Features

- **4-Level Emergency System**: Progressive alert levels from mild panic to extreme emergency
- **AI Distress Detection**: Passive audio monitoring for distress phrases and panic tones
- **Journey Tracking**: Live route monitoring with automatic check-ins
- **Trusted Contacts**: Secure contact management with priority-based alerting
- **Real-time Location Sharing**: Encrypted location tracking with multiple contacts
- **Emergency Services Integration**: Automatic police station notification

## Technology Stack

### Frontend
- **Flutter** (Cross-platform mobile development)
- **Google Maps API** (Location services)
- **Firebase Cloud Messaging** (Push notifications)

### Backend
- **Node.js + Express** (API server)
- **MongoDB** (Primary database)
- **Firebase** (Real-time data & authentication)
- **Socket.io** (Real-time communication)

### Infrastructure
- **AWS/Azure** (Cloud hosting)
- **Redis** (Caching & session management)
- **Twilio** (SMS & voice services)

## Project Structure

```
bharatnari/
├── docs/                    # Documentation
│   ├── architecture.md      # System architecture
│   ├── database.md          # Database schema
│   ├── api.md              # API endpoints
│   ├── ui-flow.md          # UI/UX design
│   └── roadmap.md          # Development roadmap
├── backend/                 # Node.js backend
├── mobile/                  # Flutter mobile app
└── deployment/             # CI/CD and deployment configs
```

## Getting Started

See the [Development Roadmap](docs/roadmap.md) for step-by-step implementation guide.

## Security & Privacy

- End-to-end encrypted location sharing
- No permanent audio storage
- Secure contact management
- GDPR and data protection compliance
