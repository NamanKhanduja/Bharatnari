# Database Schema Design

## Overview

BharatNari uses a hybrid database approach with MongoDB as the primary database and Firebase for real-time data synchronization.

## MongoDB Schema

### 1. Users Collection

```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  phone: String,
  fullName: String (required),
  profilePicture: String (URL),
  dateOfBirth: Date,
  emergencyPIN: String (4-digit),
  isVerified: Boolean (default: false),
  isActive: Boolean (default: true),
  preferences: {
    locationSharing: Boolean (default: true),
    audioMonitoring: Boolean (default: true),
    autoEmergency: Boolean (default: true),
    nightMode: Boolean (default: false)
  },
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date
}
```

### 2. TrustedContacts Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  contacts: [
    {
      name: String (required),
      phone: String (required, unique within array),
      email: String,
      relationship: String (required), // "Family", "Friend", "Colleague"
      priority: Number (1-4, required), // 1 = Closest
      isPrimary: Boolean (default: false),
      notificationMethods: [String], // ["sms", "call", "email", "app"]
      isActive: Boolean (default: true)
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### 3. EmergencySessions Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  level: Number (1-4, required),
  status: String, // "active", "resolved", "false_alarm"
  triggerType: String, // "manual", "ai_detection", "journey_deviation"
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
    accuracy: Number
  },
  contactsNotified: [ObjectId],
  startTime: Date,
  endTime: Date,
  duration: Number, // in seconds
  policeNotified: Boolean (default: false),
  policeStationId: ObjectId,
  notes: String,
  aiConfidence: Number, // 0-100 for AI triggers
  audioClip: String, // reference to stored audio (if any)
  createdAt: Date
}
```

### 4. Journeys Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  startLocation: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  endLocation: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  plannedRoute: [String], // Google Maps route waypoints
  actualRoute: [{
    latitude: Number,
    longitude: Number,
    timestamp: Date,
    speed: Number,
    heading: Number
  }],
  status: String, // "planned", "active", "completed", "emergency", "cancelled"
  startTime: Date,
  endTime: Date,
  estimatedDuration: Number, // in minutes
  actualDuration: Number,
  checkIns: [{
    timestamp: Date,
    location: {
      latitude: Number,
      longitude: Number
    },
    status: String // "auto", "manual", "missed"
  }],
  emergencyTriggered: Boolean (default: false),
  emergencySessionId: ObjectId,
  createdAt: Date
}
```

### 5. LocationHistory Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  sessionId: ObjectId, // for grouping locations
  locations: [{
    latitude: Number,
    longitude: Number,
    accuracy: Number,
    timestamp: Date,
    speed: Number,
    heading: Number,
    altitude: Number,
    source: String // "gps", "network", "passive"
  }],
  isActive: Boolean (default: true),
  createdAt: Date,
  expiresAt: Date // TTL index for automatic cleanup
}
```

### 6. EmergencyLogs Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  sessionId: ObjectId (ref: EmergencySessions),
  eventType: String, // "alert_sent", "contact_notified", "police_notified", "location_shared"
  recipient: String, // contact phone/email or "police"
  method: String, // "sms", "call", "push", "email"
  status: String, // "sent", "delivered", "failed", "pending"
  response: {
    acknowledged: Boolean,
    responseTime: Number, // in seconds
    action: String
  },
  metadata: Object, // additional event-specific data
  timestamp: Date
}
```

### 7. PoliceStations Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  phone: String (required),
  address: String (required),
  location: {
    latitude: Number (required),
    longitude: Number (required),
    radius: Number // service area radius in km
  },
  jurisdiction: String,
  isActive: Boolean (default: true),
  emergencyContacts: [{
    designation: String,
    phone: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### 8. AIDetectionLogs Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  sessionId: String,
  audioSegment: {
    duration: Number, // in seconds
    format: String,
    confidence: Number, // 0-100
    detectedPhrases: [String],
    emotion: String, // "panic", "fear", "distress", "normal"
    timestamp: Date
  },
  triggeredEmergency: Boolean,
  falsePositive: Boolean,
  modelVersion: String,
  createdAt: Date
}
```

## Firebase Real-time Database Structure

### Live Location Sharing

```javascript
/liveLocations/{userId}/{
  latitude: Number,
  longitude: Number,
  accuracy: Number,
  timestamp: Number,
  speed: Number,
  heading: Number,
  batteryLevel: Number,
  sessionId: String,
  sharingWith: [contactIds],
  expiresAt: Number
}
```

### Emergency Status

```javascript
/emergencyStatus/{userId}/{
  isActive: Boolean,
  level: Number,
  startTime: Number,
  location: {
    latitude: Number,
    longitude: Number
  },
  contactsNotified: [contactIds],
  policeNotified: Boolean,
  lastUpdate: Number
}
```

### User Presence

```javascript
/presence/{userId}/{
  online: Boolean,
  lastSeen: Number,
  currentJourney: String,
  emergencyMode: Boolean
}
```

## Indexes

### MongoDB Indexes

```javascript
// Users Collection
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ phone: 1 })
db.users.createIndex({ isActive: 1 })

// TrustedContacts Collection
db.trustedcontacts.createIndex({ userId: 1 })
db.trustedcontacts.createIndex({ "contacts.phone": 1 })

// EmergencySessions Collection
db.emergencysessions.createIndex({ userId: 1 })
db.emergencysessions.createIndex({ status: 1 })
db.emergencysessions.createIndex({ startTime: -1 })
db.emergencysessions.createIndex({ level: 1, status: 1 })

// Journeys Collection
db.journeys.createIndex({ userId: 1 })
db.journeys.createIndex({ status: 1 })
db.journeys.createIndex({ startTime: -1 })

// LocationHistory Collection
db.locationhistory.createIndex({ userId: 1 })
db.locationhistory.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
db.locationhistory.createIndex({ "locations.timestamp": -1 })

// EmergencyLogs Collection
db.emergencylogs.createIndex({ userId: 1 })
db.emergencylogs.createIndex({ sessionId: 1 })
db.emergencylogs.createIndex({ timestamp: -1 })

// PoliceStations Collection
db.policestations.createIndex({ location: "2dsphere" })
db.policestations.createIndex({ isActive: 1 })
```

## Data Retention Policy

### Automatic Cleanup
- Location History: 30 days (TTL index)
- AI Detection Logs: 90 days
- Emergency Logs: 1 year (for legal compliance)
- Journey History: 6 months

### Manual Cleanup
- Users can delete their journey history
- Emergency sessions can be archived after resolution
- Location data can be manually purged

## Security Considerations

### Encryption
- All sensitive data encrypted at rest
- Phone numbers and emails encrypted
- Location data encrypted during transmission

### Access Control
- Role-based access control
- Data isolation between users
- Audit logging for data access

### Privacy Protection
- Data minimization principles
- User consent for data collection
- Right to be forgotten implementation
