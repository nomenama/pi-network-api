# Express TypeScript App

A modern Express.js application built with TypeScript and ES6 modules.

## Features

- **TypeScript**: Full TypeScript support with strict type checking
- **ES6 Modules**: Modern import/export syntax
- **Express.js**: Fast, unopinionated web framework
- **Structured Architecture**: Organized code with separate routes, middleware, and models
- **Error Handling**: Centralized error handling middleware
- **Logging**: Request logging middleware
- **Development Tools**: Hot reload with tsx

## Project Structure

```
src/
├── index.ts              # Main application entry point
├── routes/
│   └── userRoutes.ts     # User API routes
├── middleware/
│   ├── errorHandler.ts   # Global error handling
│   └── logger.ts         # Request logging
├── models/
│   └── User.ts           # User interface definitions
└── utils/
    └── asyncHandler.ts   # Async route handler wrapper
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Build the project:

```bash
npm run build
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

### Production

Build and start the production server:

```bash
npm run build
npm start
```

## API Endpoints

### Base URL

```
http://localhost:3000
```

### Endpoints

- `GET /` - Welcome message
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

### Example Requests

#### Get all users:

```bash
curl http://localhost:3000/api/users
```

#### Create a new user:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Remove build directory

## Key Features Explained

### TypeScript Configuration

- Strict type checking enabled
- ES2022 target with ESNext modules
- Source maps for debugging

### ES6 Modules

- Uses `"type": "module"` in package.json
- All imports use `.js` extension for compatibility
- Modern import/export syntax throughout

### Error Handling

- Centralized error handling middleware
- Async error catching with custom asyncHandler
- Development vs production error responses

### Middleware

- Request logging with timestamps
- JSON body parsing
- URL-encoded form parsing

## Development Notes

- All TypeScript files use `.ts` extension
- Compiled JavaScript goes to `dist/` directory
- Import statements must include `.js` extension for ES modules
- Uses `tsx` for development hot reloading
