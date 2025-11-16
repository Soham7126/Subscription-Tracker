# Subscription Management Backend (MERN API)

A backend API built using Node.js, Express, MongoDB, and JWT Authentication.  
This project handles user authentication, subscription lifecycle management, and secure access control with ownership verification.

---

## Features

### Authentication
- JWT-based signup and login
- Secure password hashing with bcrypt
- Logout and token invalidation
- Cookie parser support

### User Management
- Retrieve all users
- Retrieve a user by ID
- Create a new user
- Update a user
- Delete a user

### Subscription Management
- Create, update, and delete subscriptions
- Ownership-based access control (users can only manage their own subscriptions)
- Cancel subscriptions
- Fetch subscriptions for a specific user
- Automatic renewal date calculation
- Get subscriptions renewing in the next 30 days
- MongoDB transaction support

### Security and Best Practices
- Bearer token authentication
- Middleware-based authorization and ownership checks
- Centralized error handling
- Clean and structured codebase

---

## Folder Structure

project/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ └── utils/
├── .env
├── package.json
├── README.md
└── app.js


---

## API Routes

### Auth Routes (`/api/v1/auth`)

| Method | Route      | Description          |
|--------|------------|----------------------|
| POST   | /signup    | Create new user      |
| POST   | /signin    | Login and get JWT    |
| POST   | /signout   | Logout user          |

---

### User Routes (`/api/v1/users`)

| Method | Route   | Description         |
|--------|---------|---------------------|
| GET    | /       | Get all users       |
| GET    | /:id    | Get user by ID      |
| POST   | /       | Create user         |
| PUT    | /:id    | Update user         |
| DELETE | /:id    | Delete user         |

---

### Subscription Routes (`/api/v1/subscription`)

| Method | Route                    | Protected | Description                          |
|--------|---------------------------|-----------|--------------------------------------|
| GET    | /                         | Yes       | Get all subscriptions                |
| GET    | /:id                      | Yes       | Get subscription by ID (owner only)  |
| POST   | /                         | Yes       | Create subscription                  |
| PUT    | /:id                      | Yes       | Update subscription (owner only)     |
| DELETE | /:id                      | Yes       | Delete subscription (owner only)     |
| GET    | /user/:id                | Yes       | Get subscriptions for a user         |
| PUT    | /:id/cancel              | Yes       | Cancel subscription                  |
| GET    | /upcoming-renewals       | Yes       | Get renewals within the next 30 days |

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt
- dotenv
- cookie-parser

---

## Installation

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
