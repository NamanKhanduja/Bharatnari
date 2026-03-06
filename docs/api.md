# API Endpoints Specification

## Base URL
```
Production: https://api.bharatnari.com/v1
Development: http://localhost:3000/v1
```

## Authentication

All endpoints (except auth endpoints) require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2024-03-05T12:00:00Z"
}
```

## Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  },
  "timestamp": "2024-03-05T12:00:00Z"
}
```

---

## 1. Authentication Endpoints

### 1.1 Send OTP
```
POST /auth/send-otp
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "otpId": "123456",
    "expiresIn": 300
  }
}
```

### 1.2 Verify OTP
```
POST /auth/verify-otp
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "otpId": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "isNewUser": false
    }
  }
}
```

### 1.3 Refresh Token
```
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

### 1.4 Logout
```
POST /auth/logout
```

---

## 2. User Profile Endpoints

### 2.1 Get Profile
```
GET /users/profile
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "phone": "+1234567890",
    "profilePicture": "https://example.com/avatar.jpg",
    "dateOfBirth": "1990-01-01",
    "emergencyPIN": "1234",
    "preferences": {
      "locationSharing": true,
      "audioMonitoring": true,
      "autoEmergency": true,
      "nightMode": false
    },
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### 2.2 Update Profile
```
PUT /users/profile
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "emergencyPIN": "1234",
  "preferences": {
    "locationSharing": true,
    "audioMonitoring": true,
    "autoEmergency": true,
    "nightMode": false
  }
}
```

### 2.3 Upload Profile Picture
```
POST /users/profile-picture
```

**Request:** Multipart form with file

---

## 3. Trusted Contacts Endpoints

### 3.1 Get Trusted Contacts
```
GET /contacts
```

**Response:**
```json
{
  "success": true,
  "data": {
    "contacts": [
      {
        "id": "contact_id",
        "name": "Jane Doe",
        "phone": "+1234567890",
        "email": "jane@example.com",
        "relationship": "Family",
        "priority": 1,
        "isPrimary": true,
        "notificationMethods": ["sms", "call", "app"],
        "isActive": true
      }
    ]
  }
}
```

### 3.2 Add Trusted Contact
```
POST /contacts
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "phone": "+1234567890",
  "email": "jane@example.com",
  "relationship": "Family",
  "priority": 1,
  "isPrimary": false,
  "notificationMethods": ["sms", "call", "app"]
}
```

### 3.3 Update Trusted Contact
```
PUT /contacts/{contactId}
```

### 3.4 Delete Trusted Contact
```
DELETE /contacts/{contactId}
```

### 3.5 Reorder Contacts Priority
```
PUT /contacts/reorder
```

**Request Body:**
```json
{
  "contacts": [
    {"id": "contact1", "priority": 1},
    {"id": "contact2", "priority": 2}
  ]
}
```

---

## 4. Emergency Endpoints

### 4.1 Trigger Emergency
```
POST /emergency/trigger
```

**Request Body:**
```json
{
  "level": 2,
  "location": {
    "latitude": 19.0760,
    "longitude": 72.8777,
    "address": "Mumbai, Maharashtra"
  },
  "triggerType": "manual",
  "notes": "Feeling unsafe in this area"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "emergency_session_id",
    "level": 2,
    "status": "active",
    "contactsNotified": ["contact1", "contact2"],
    "policeNotified": false,
    "startTime": "2024-03-05T12:00:00Z"
  }
}
```

### 4.2 Update Emergency Level
```
PUT /emergency/{sessionId}/level
```

**Request Body:**
```json
{
  "level": 3,
  "reason": "Situation escalated"
}
```

### 4.3 Resolve Emergency
```
POST /emergency/{sessionId}/resolve
```

**Request Body:**
```json
{
  "status": "resolved",
  "notes": "Safe now, false alarm"
}
```

### 4.4 Get Active Emergency
```
GET /emergency/active
```

### 4.5 Get Emergency History
```
GET /emergency/history?page=1&limit=10
```

---

## 5. Location Endpoints

### 5.1 Update Location
```
POST /location/update
```

**Request Body:**
```json
{
  "latitude": 19.0760,
  "longitude": 72.8777,
  "accuracy": 10,
  "speed": 0,
  "heading": 0,
  "altitude": 0,
  "timestamp": "2024-03-05T12:00:00Z",
  "sessionId": "session_id"
}
```

### 5.2 Start Location Sharing
```
POST /location/share
```

**Request Body:**
```json
{
  "contacts": ["contact1", "contact2"],
  "duration": 3600,
  "sessionId": "session_id"
}
```

### 5.3 Stop Location Sharing
```
POST /location/stop-share
```

### 5.4 Get Location History
```
GET /location/history?from=2024-03-01&to=2024-03-05
```

---

## 6. Journey Endpoints

### 6.1 Create Journey
```
POST /journeys
```

**Request Body:**
```json
{
  "startLocation": {
    "latitude": 19.0760,
    "longitude": 72.8777,
    "address": "Mumbai, Maharashtra"
  },
  "endLocation": {
    "latitude": 19.0760,
    "longitude": 72.8777,
    "address": "Delhi, Delhi"
  },
  "estimatedDuration": 120,
  "checkInInterval": 900
}
```

### 6.2 Start Journey
```
POST /journeys/{journeyId}/start
```

### 6.3 Update Journey Location
```
POST /journeys/{journeyId}/location
```

**Request Body:**
```json
{
  "latitude": 19.0760,
  "longitude": 72.8777,
  "timestamp": "2024-03-05T12:00:00Z",
  "speed": 60,
  "heading": 90
}
```

### 6.4 Complete Journey
```
POST /journeys/{journeyId}/complete
```

### 6.5 Cancel Journey
```
POST /journeys/{journeyId}/cancel
```

### 6.6 Get Journey History
```
GET /journeys/history?page=1&limit=10
```

### 6.7 Get Active Journey
```
GET /journeys/active
```

---

## 7. AI Detection Endpoints

### 7.1 Submit Audio Segment
```
POST /ai/analyze-audio
```

**Request:** Multipart form with audio file

**Response:**
```json
{
  "success": true,
  "data": {
    "confidence": 85,
    "detectedPhrases": ["help", "bachao"],
    "emotion": "panic",
    "triggerEmergency": true,
    "analysisId": "analysis_id"
  }
}
```

### 7.2 Get AI Detection History
```
GET /ai/detections?page=1&limit=10
```

### 7.3 Report False Positive
```
POST /ai/false-positive/{analysisId}
```

---

## 8. Police Stations Endpoints

### 8.1 Get Nearby Police Stations
```
GET /police/nearby?lat=19.0760&lng=72.8777&radius=5
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stations": [
      {
        "id": "station_id",
        "name": "Mumbai Police Station",
        "phone": "+9111223344",
        "address": "Mumbai, Maharashtra",
        "location": {
          "latitude": 19.0760,
          "longitude": 72.8777
        },
        "distance": 1.2,
        "jurisdiction": "Mumbai City"
      }
    ]
  }
}
```

### 8.2 Notify Police Station
```
POST /police/notify
```

**Request Body:**
```json
{
  "stationId": "station_id",
  "emergencyLevel": 4,
  "location": {
    "latitude": 19.0760,
    "longitude": 72.8777,
    "address": "Mumbai, Maharashtra"
  },
  "userDetails": {
    "name": "John Doe",
    "phone": "+1234567890"
  },
  "emergencyId": "emergency_session_id"
}
```

---

## 9. Notification Endpoints

### 9.1 Register Device Token
```
POST /notifications/register-token
```

**Request Body:**
```json
{
  "token": "fcm_token_here",
  "platform": "android" // "android" or "ios"
}
```

### 9.2 Send Test Notification
```
POST /notifications/test
```

### 9.3 Get Notification History
```
GET /notifications/history?page=1&limit=10
```

---

## 10. WebSocket Events

### 10.1 Connection
```
Socket: /ws/user/{userId}
Authentication: Bearer token in query parameter
```

### 10.2 Events

#### Location Update
```json
{
  "event": "location_update",
  "data": {
    "userId": "user_id",
    "location": {
      "latitude": 19.0760,
      "longitude": 72.8777,
      "timestamp": "2024-03-05T12:00:00Z"
    }
  }
}
```

#### Emergency Alert
```json
{
  "event": "emergency_alert",
  "data": {
    "sessionId": "emergency_session_id",
    "userId": "user_id",
    "level": 3,
    "location": {
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "message": "Emergency alert triggered"
  }
}
```

#### Journey Update
```json
{
  "event": "journey_update",
  "data": {
    "journeyId": "journey_id",
    "status": "active",
    "location": {
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "progress": 45
  }
}
```

---

## 11. Admin Endpoints

### 11.1 Get Dashboard Stats
```
GET /admin/dashboard
Authorization: Admin token required
```

### 11.2 Get All Users
```
GET /admin/users?page=1&limit=50
Authorization: Admin token required
```

### 11.3 Get Emergency Analytics
```
GET /admin/analytics/emergencies?from=2024-03-01&to=2024-03-05
Authorization: Admin token required
```

---

## Rate Limiting

- **Auth endpoints**: 5 requests per minute
- **Location updates**: 60 requests per minute
- **Emergency triggers**: 10 requests per hour
- **Other endpoints**: 100 requests per minute

## Error Codes

| Code | Description |
|------|-------------|
| AUTH_001 | Invalid credentials |
| AUTH_002 | Token expired |
| AUTH_003 | Invalid token |
| USER_001 | User not found |
| USER_002 | Profile incomplete |
| CONTACT_001 | Contact limit exceeded |
| CONTACT_002 | Invalid phone number |
| EMERGENCY_001 | Invalid emergency level |
| EMERGENCY_002 | Session not found |
| LOCATION_001 | Invalid coordinates |
| JOURNEY_001 | Journey not found |
| AI_001 | Audio processing failed |
| POLICE_001 | Station not found |
| RATE_001 | Rate limit exceeded |
| SERVER_001 | Internal server error |
