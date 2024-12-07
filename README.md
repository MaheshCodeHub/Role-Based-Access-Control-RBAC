# Role-Based-Access-Control-RBAC

## Project Overview

This project implements Role-Based Access Control (RBAC) to manage user access based on roles (e.g., admin, user). It consists of a client and server, with the server handling authentication and database operations.

## Setup Instructions
### 1. Clone the repository and navigate to the `client` directory:
cd client
### 2. Install the required dependencies in the `client` folder:
npm install
### 3. Navigate to the `server` folder:
cd ../server
### 4. Install the required dependencies in the `server` folder:
npm install
### 5. Set up environment variables in the `server/.env` file:
Ex:-MONGO_URL='mongodb://localhost:27017/myrbac' JWT_SECRET='mahesh@12345!' PORT=3000
### 6. Start the development server:
In the `client` folder, run:npm run dev
In the `server` folder, run:npm start
### 7. Register a new user through Postman:
Make a `POST` request to `http://localhost:3000/api/register` with the following payload:
```json
{
  "name": "mahesh more",
  "email": "mahesh@gmail.com",
  "password": "mahesh@123",
  "userType": "admin",
  "status": true
}
Note: Add the first user manually and set userType as admin to have full access. This user will have permission to perform changes.
After registering the admin user, you can create additional users in the admin section.
Usage
Admin Users: Have access to manage other users, create roles, and perform privileged operations.
Regular Users: Have limited access depending on their assigned role.
Dependencies
Client: React, Axios (for API calls), etc.
Server: Express, MongoDB, JWT, etc.








