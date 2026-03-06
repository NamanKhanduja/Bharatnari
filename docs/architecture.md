# System Architecture

## Overview

BharatNari follows a microservices architecture with real-time communication capabilities, ensuring scalability, reliability, and low-latency emergency response.

## Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   Web Dashboard │    │   Admin Panel   │
│   (Flutter)     │    │   (React)       │    │   (React)       │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          │ HTTP/WebSocket       │ HTTP/WebSocket       │ HTTP
          ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API Gateway                                  │
│                 (Express + Rate Limiting)                        │
└───────────────────────┬───────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Auth Service  │ │  Emergency Svc  │ │ Location Service│
│   (JWT + OTP)   │ │ (Real-time)     │ │ (GPS Tracking)  │
└─────────┬───────┘ └─────────┬───────┘ └─────────┬───────┘
          │               │               │
          ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Message Broker                              │
│                      (Redis + Socket.io)                        │
└───────────────────────┬───────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   MongoDB       │ │   Firebase      │ │   External APIs │
│   (Primary DB)  │ │ (Real-time)     │ │ (Police, Maps)  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

## Core Components

### 1. Mobile Application (Flutter)
- **Authentication Module**: Email OTP, biometric login
- **Location Service**: GPS tracking, geofencing
- **Emergency Module**: 4-level panic system
- **AI Detection**: Audio processing for distress
- **Journey Tracker**: Route monitoring
- **Contact Management**: Trusted contacts CRUD

### 2. Backend Services

#### Authentication Service
- JWT token management
- Email OTP verification
- Session management
- Passwordless authentication

#### Emergency Service
- Real-time alert processing
- Multi-level emergency escalation
- Contact notification system
- Police station integration

#### Location Service
- GPS coordinate processing
- Location history management
- Geofencing capabilities
- Route deviation detection

#### AI Service
- Audio stream processing
- Distress pattern recognition
- False positive filtering
- Emergency trigger automation

### 3. Database Layer

#### MongoDB (Primary Database)
- User profiles and preferences
- Contact information
- Emergency logs
- Journey history

#### Firebase (Real-time Data)
- Live location sharing
- Real-time emergency status
- Push notification tokens
- Online/offline status

### 4. External Integrations

#### Google Maps API
- Location services
- Route optimization
- Geocoding
- Police station locations

#### Twilio
- SMS emergency alerts
- Voice call automation
- Emergency notifications

#### Firebase Cloud Messaging
- Push notifications
- Emergency alerts
- Journey updates

## Data Flow

### Emergency Alert Flow
1. User triggers emergency (manual or AI)
2. Mobile app sends alert to API Gateway
3. Emergency Service processes alert level
4. Service notifies trusted contacts via multiple channels
5. Real-time location sharing activated
6. Emergency services notified (if required)

### Journey Tracking Flow
1. User starts journey with start/end points
2. Location Service monitors route in real-time
3. AI analyzes movement patterns
4. Deviations trigger check-in notifications
5. No response escalates to emergency alert

### AI Detection Flow
1. Audio service monitors in background
2. ML model processes audio stream
3. Distress patterns detected
4. Confidence score calculated
5. High confidence triggers automatic emergency

## Security Architecture

### Encryption
- End-to-end encryption for location data
- AES-256 for sensitive information
- TLS 1.3 for all communications

### Authentication
- JWT with refresh tokens
- Multi-factor authentication
- Session timeout management

### Privacy Protection
- Data minimization principles
- Automatic data deletion policies
- GDPR compliance measures

## Scalability Considerations

### Horizontal Scaling
- Stateless service design
- Load balancer distribution
- Database sharding capability

### Performance Optimization
- Redis caching layer
- CDN for static assets
- Database indexing strategy

### Reliability
- Service redundancy
- Automatic failover
- Health monitoring systems

## Deployment Architecture

### Cloud Infrastructure
- Container orchestration (Kubernetes)
- Auto-scaling groups
- Multi-region deployment

### Monitoring & Logging
- Application performance monitoring
- Error tracking systems
- Real-time alerting dashboard
