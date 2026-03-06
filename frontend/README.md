# BharatNari Frontend

Women Safety Platform - Frontend Application

## Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **React Router** - Client-side Routing
- **Tailwind CSS** - Styling
- **Zustand** - State Management
- **React Hook Form** - Form Handling
- **Framer Motion** - Animations
- **Axios** - HTTP Client
- **React Query** - Server State Management

## Getting Started

### Prerequisites

- Node.js (>= 16.0.0)
- npm (>= 8.0.0)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd bharatnari/frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your API URL
```

4. Start development server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
│   ├── Login.jsx
│   ├── OTPVerification.jsx
│   └── Dashboard.jsx
├── services/      # API services
│   └── authService.js
├── store/         # State management
│   └── authStore.js
├── utils/         # Utility functions
├── hooks/         # Custom hooks
├── assets/        # Static assets
├── App.jsx        # Main app component
├── main.jsx       # Entry point
└── index.css      # Global styles
```

## Features

### Authentication
- Email-based OTP authentication
- Secure token management
- Form validation
- Loading states

### UI/UX
- Responsive design
- Smooth animations
- Modern interface
- Accessibility features

### State Management
- Zustand for global state
- React Query for server state
- Local storage for persistence

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3001/api/v1
```

## API Integration

The frontend connects to the backend API for:
- Authentication (send/verify OTP)
- User management
- Emergency services
- Location tracking

## Build & Deployment

### Production Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

The build output will be in the `dist` directory.

## Contributing

1. Follow the existing code style
2. Use meaningful commit messages
3. Test your changes
4. Update documentation

## Security

- No sensitive data in client-side code
- Secure token storage
- Input validation
- HTTPS in production
