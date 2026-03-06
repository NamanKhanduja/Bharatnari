# UI/UX Design & Screen Flow

## App Navigation Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Navigation Flow                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Onboarding    │ →  │   Authentication│ →  │   Main App      │
│   (3 screens)   │    │   (2 screens)   │    │   (Tab Layout)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                      │
                       ┌─────────────────────────────┼─────────────────────────────┐
                       │                             │                             │
               ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
               │   Safety Tab  │             │ Journey Tab   │             │  Profile Tab  │
               │               │             │               │             │               │
               │ Emergency UI  │             │ Journey UI    │             │ Settings UI   │
               │ Location Map  │             │ Route Map     │             │ Contacts UI   │
               │ Quick Actions │             │ Check-ins     │             │ History UI    │
               └───────────────┘             └───────────────┘             └───────────────┘
```

## Screen-by-Screen Design

### 1. Onboarding Screens

#### Screen 1: Welcome
- **Content**: App logo, tagline "Your Personal Safety Companion"
- **Visual**: Clean design with safety imagery
- **CTA**: "Get Started" button
- **Features**: Skip option, dots indicator

#### Screen 2: Key Features
- **Content**: 4 key features with icons
  - 🚨 4-Level Emergency System
  - 📍 Real-time Location Sharing
  - 🤖 AI Distress Detection
  - 👥 Trusted Contact Network
- **Visual**: Feature cards with illustrations
- **CTA**: "Continue" button

#### Screen 3: Permissions
- **Content**: Permission requests with explanations
  - 📍 Location (Foreground + Background)
  - 📞 Phone Calls (Emergency)
  - 🎤 Microphone (AI Detection)
  - 💬 SMS (Emergency Alerts)
- **Visual**: Permission icons with descriptions
- **CTA**: "Grant Permissions" button

### 2. Authentication Screens

#### Screen 4: Email Login
- **Content**: Email input field
- **Visual**: Clean form with email icon
- **Validation**: Real-time email validation
- **CTA**: "Send OTP" button
- **Help**: "Already have OTP?" link

#### Screen 5: OTP Verification
- **Content**: 6-digit OTP input
- **Visual**: Large, spaced OTP digits
- **Features**: Auto-read SMS, resend option (60s countdown)
- **CTA**: "Verify" button
- **Status**: Loading state during verification

### 3. Profile Setup (First Time)

#### Screen 6: Basic Information
- **Content**: 
  - Full Name (required)
  - Phone Number (required)
  - Date of Birth (optional)
  - Profile Picture upload
- **Validation**: Phone number format validation
- **CTA**: "Continue" button

#### Screen 7: Emergency PIN
- **Content**: 4-digit PIN setup
  - Enter PIN
  - Confirm PIN
- **Visual**: Secure PIN input interface
- **Features**: Show/hide PIN option
- **CTA**: "Set PIN" button

#### Screen 8: Trusted Contacts Setup
- **Content**: Add exactly 4 contacts
  - Contact name
  - Phone number
  - Relationship (Family/Friend/Colleague)
  - Priority selection (1-4)
- **Visual**: Contact cards with add/edit options
- **Validation**: Phone number uniqueness
- **CTA**: "Complete Setup" button

### 4. Main App - Safety Tab

#### Screen 9: Safety Dashboard
- **Header**: "I'm Safe" status with location
- **Emergency Button**: Large, prominent panic button
- **Quick Actions**:
  - 📍 Share Location
  - 🚨 Emergency Levels
  - 🗺️ View on Map
  - 📞 Emergency Contacts
- **Status Cards**:
  - Active journey status
  - Last location update
  - Battery level

#### Screen 10: Emergency Levels
- **Layout**: 4-level emergency selector
- **Level 1 - Mild Panic**:
  - Icon: 🟡 Yellow alert
  - Description: "Share location with closest contact"
  - Action: Single tap to activate
- **Level 2 - Moderate Panic**:
  - Icon: 🟠 Orange alert
  - Description: "Alert all contacts, continuous tracking"
  - Action: Double tap to activate
- **Level 3 - High Alert**:
  - Icon: 🔴 Red alert
  - Description: "Auto-call contacts, send voice note"
  - Action: Long press to activate
- **Level 4 - Extreme Alert**:
  - Icon: 🚨 Emergency siren
  - Description: "Call all contacts + police, activate siren"
  - Action: Triple tap + confirmation

#### Screen 11: Live Location Map
- **Map View**: Google Maps integration
- **Features**:
  - Current location marker
  - Trusted contacts locations (if sharing)
  - Nearby police stations
  - Journey route overlay
- **Controls**:
  - Zoom in/out
  - Map type toggle (Normal/Satellite)
  - Location sharing toggle
- **Bottom Sheet**: Location sharing details

#### Screen 12: Active Emergency
- **Header**: "EMERGENCY ACTIVE" with pulsing red indicator
- **Timer**: Duration counter
- **Current Level**: Visual level indicator
- **Actions**:
  - 📍 Update Location
  - 📞 Call Contacts
  - 🚨 Upgrade Level
  - ✅ Mark Safe
- **Contact Status**:
  - Notified contacts list
  - Response status icons
  - Police notification status

### 5. Main App - Journey Tab

#### Screen 13: Journey Dashboard
- **Header**: "Journey Safety"
- **Quick Actions**:
  - 🚗 Start New Journey
  - 📍 Active Journey (if any)
  - 📊 Journey History
- **Recent Journeys**: List of last 5 journeys
- **Stats**: Total journeys, average duration

#### Screen 14: Create Journey
- **Form Fields**:
  - Start Location (Current/Custom)
  - Destination (Search/Select)
  - Estimated Duration (Auto-calculated)
  - Check-in Interval (15/30/60 minutes)
- **Map Preview**: Route visualization
- **Safety Options**:
  - Share with contacts
  - Auto-check-in enabled
  - Deviation alerts
- **CTA**: "Start Journey" button

#### Screen 15: Active Journey
- **Header**: Journey progress bar
- **Map View**: Real-time route tracking
- **Information Cards**:
  - Distance covered
  - Estimated arrival time
  - Current speed
  - Next check-in countdown
- **Actions**:
  - 📍 Check In Now
  - 📞 Emergency
  - 🔄 Update Route
  - ✅ Complete Journey
- **Bottom Sheet**: Contact notifications status

#### Screen 16: Journey History
- **List View**: Chronological journey list
- **Journey Card**:
  - Date and time
  - Start/End locations
  - Duration and distance
  - Status (Completed/Emergency)
  - Emergency indicator (if applicable)
- **Filters**: Date range, status filter
- **Actions**: View details, share journey

### 6. Main App - Profile Tab

#### Screen 17: Profile Overview
- **Header**: Profile picture and name
- **Status Indicators**:
  - Account verification status
  - Emergency contacts setup
  - Permissions status
- **Menu Items**:
  - 👥 Trusted Contacts
  - 🔔 Notifications
  - ⚙️ Settings
  - 📊 Safety Analytics
  - 📞 Emergency History
  - ❓ Help & Support
  - 🚪 Logout

#### Screen 18: Trusted Contacts Management
- **Contact List**: 4 contact cards
- **Contact Card**:
  - Name and relationship
  - Phone number
  - Priority level
  - Notification methods
  - Edit/Delete options
- **Actions**:
  - ➕ Add Contact (if slot available)
  - 🔄 Reorder Priority
  - 📞 Test Notification

#### Screen 19: Settings
- **Categories**:
  - **Privacy Settings**:
    - Location sharing
    - Audio monitoring
    - Data retention
  - **Notification Settings**:
    - Push notifications
    - SMS alerts
    - Emergency sounds
  - **Safety Settings**:
    - Auto-emergency trigger
    - AI sensitivity
    - Emergency PIN change
  - **App Settings**:
    - Theme (Light/Dark)
    - Language
    - About app

#### Screen 20: Emergency History
- **Timeline View**: Chronological emergency list
- **Emergency Item**:
  - Date and time
  - Emergency level
  - Duration
  - Trigger type
  - Contacts notified
  - Resolution status
- **Filters**: Level, date range, status
- **Actions**: View details, export report

### 7. Emergency Flow Screens

#### Screen 21: Emergency Confirmation
- **Trigger**: Based on emergency level
- **Content**:
  - "Are you sure you want to trigger Level X emergency?"
  - Action description
  - Contacts to be notified
- **Actions**:
  - ✅ Yes, Trigger Emergency
  - ❌ Cancel
- **Safety**: Cancel option for lower levels only

#### Screen 22: Emergency Active
- **Header**: Pulsing emergency indicator
- **Live Updates**:
  - Location sharing status
  - Contact responses
  - Police notification status
- **Actions**:
  - 📞 Call Contact
  - 📍 Share Location
  - 🚨 Upgrade Level
  - ✅ I'm Safe

#### Screen 23: Emergency Resolution
- **Content**:
  - "Emergency resolved successfully"
  - Duration summary
  - Contact responses
  - Next steps
- **Actions**:
  - 📊 View Report
  - 🏠 Go Home
  - 📞 Contact Support

### 8. Special UI Components

#### Emergency Button Widget
- **Design**: Large, accessible button
- **States**: Normal, Pressed, Emergency Active
- **Animations**: Pulse effect during emergency
- **Accessibility**: High contrast, large touch area

#### Location Sharing Indicator
- **Design**: Small floating indicator
- **States**: Sharing, Not Sharing, Emergency
- **Information**: Who can see location, duration

#### Check-in Notification
- **Design**: Full-screen overlay
- **Content**: "Are you safe? Check in now"
- **Timer**: Countdown to auto-emergency
- **Actions**: I'm Safe, Emergency, Snooze

#### AI Detection Alert
- **Design**: Warning overlay
- **Content**: "Distress detected. Trigger emergency?"
- **Timer**: Auto-trigger countdown
- **Actions**: Yes, No, False Alarm

## Design System

### Colors
- **Primary**: #FF6B6B (Safety Red)
- **Secondary**: #4ECDC4 (Trust Teal)
- **Success**: #51CF66 (Safe Green)
- **Warning**: #FFD93D (Caution Yellow)
- **Danger**: #FF6B6B (Emergency Red)
- **Neutral**: #495057 (Dark Gray)
- **Light**: #F8F9FA (Background)

### Typography
- **Headings**: Roboto Bold (24/32/40px)
- **Body**: Roboto Regular (16/18px)
- **Captions**: Roboto Light (12/14px)
- **Emergency**: Roboto Black (48/64px)

### Icons
- **Library**: Material Design Icons
- **Size**: 24dp (standard), 48dp (emergency)
- **Style**: Outlined (default), Filled (active)

### Spacing
- **XS**: 4dp
- **S**: 8dp
- **M**: 16dp
- **L**: 24dp
- **XL**: 32dp
- **XXL**: 48dp

### Animations
- **Duration**: 200ms (quick), 500ms (smooth)
- **Easing**: Ease-in-out
- **Emergency**: Pulse animation (1s interval)

## Accessibility Features

### Visual
- High contrast mode
- Large text support
- Color blind friendly palette
- Screen reader support

### Motor
- Large touch targets (44dp minimum)
- Gesture alternatives
- Voice control support
- One-handed operation

### Cognitive
- Simple language
- Clear visual hierarchy
- Consistent navigation
- Error prevention

## Platform-Specific Considerations

### Android
- Material Design 3 components
- Bottom navigation bar
- Status bar color adaptation
- Back button handling

### iOS
- Human Interface Guidelines
- Tab bar navigation
- Safe area handling
- Gesture navigation support
