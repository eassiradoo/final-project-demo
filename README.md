# CRUD Application

A simple CRUD application with React frontend and Node.js/Express backend with PostgreSQL database.

## Project Structure

```
final-project-demo/
├── client/                 # React frontend
└── server/                 # Node.js/Express backend
```

## Prerequisites

- Node.js
- PostgreSQL

## Setup Instructions

1. Clone the repository
2. Set up the database:
   - Create a PostgreSQL database named `crud_app`
   - Update the `.env` file in the server directory with your database credentials

3. Backend Setup:
   ```bash
   cd server
   npm install
   npm run dev
   ```

4. Frontend Setup:
   ```bash
   cd client
   npm install
   npm start
   ```

## Environment Variables

Create a `.env` file in the server directory with the following variables:
```
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=crud_app
DB_PASSWORD=your_password
DB_PORT=5432
```

## Available Scripts

### Backend
- `npm run dev`: Start the development server with nodemon
- `npm start`: Start the production server

### Frontend
- `npm start`: Start the development server
- `npm build`: Build the production bundle
