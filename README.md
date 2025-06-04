# Pi Network API

This project consists of a frontend and a backend application. The frontend 
is built with Next.js and the backend is built with Express.js and 
TypeScript. It is possible to move the backend entirely into Next.js. 

## Project Overview

The Pi Network API project is designed to facilitate interactions with the Pi Network blockchain. It provides a user-friendly interface for users to manage their Pi Network accounts, perform transactions, and interact with smart contracts. The backend handles the core logic and API endpoints, while the frontend provides a responsive and intuitive user experience.

## Project Structure

- `frontend/`: Contains the Next.js frontend application.
- `backend/`: Contains the Express.js backend application.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pi-network-api
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

## Running the Application

### Development

To run both the frontend and backend concurrently in development mode, use the following command from the root directory:

```bash
npm run dev
```

This will start the frontend on `http://localhost:3000` and the backend on `http://localhost:8080`.

### Building

To build both the frontend and backend, run:

```bash
npm run build
```

### Starting

To start both the frontend and backend, run:

```bash
npm run start
```

### Linting and Formatting

To lint and format both the frontend and backend, run:

```bash
npm run lint
npm run format
```

## Environment Variables

- Frontend: Set `NEXT_PUBLIC_API_URL` in a `.env.local` file to point to your backend API (e.g., `http://localhost:8080/api`).
- Backend: Set any required environment variables in a `.env` file in the `backend` directory.

## License

This project is licensed under the MIT License. 
