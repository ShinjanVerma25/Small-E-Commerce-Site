# Small E-Commerce Application

A simple full-stack e-commerce application built as part of the Sheryians Coding School assignment.

The project includes user authentication with JWT, refresh tokens, product CRUD APIs, input validation, and a React frontend to use the APIs.

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-validator

### Frontend

- React
- Vite
- Tailwind CSS

## Features

### Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT access token
- JWT refresh token
- Logout
- Get logged-in user details
- Protected routes

### Product Management

- Create a product
- View all products
- View a single product
- Update a product
- Delete a product

### Validation

- Email validation
- Password validation
- Confirm password validation
- Product field validation
- Product ID validation
- Field-level validation errors

## Project Structure

```text
Small-E-Commerce-Site/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh-token` | Generate a new access token |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get logged-in user |

### Products

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/products` | Create a product |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get one product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

Create, update, and delete product requests require authentication.

## Authentication Flow

1. User registers an account.
2. Password is hashed before being stored in MongoDB.
3. User logs in with email and password.
4. The server returns an access token.
5. A refresh token is stored in an httpOnly cookie and in the database.
6. The access token is used to access protected routes.
7. The refresh token can be used to get a new access token.
8. During logout, the stored refresh token is removed.

## Frontend

The React frontend provides:

- Register page
- Login page
- Product listing
- Add product form
- Edit product
- Delete product
- Logout

Tailwind CSS is used for the basic responsive styling.

## Author

**Shinjan Verma**
