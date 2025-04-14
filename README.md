
# User Authentication with Neon, PostgreSQL, and Prisma

This project is a full-featured user authentication API built using Node.js, Express, Neon PostgreSQL, and Prisma. It implements common authentication features including:

- User Registration with Email Verification  
- User Login using JWT tokens (with secure cookie handling)  
- Protected Routes to fetch authenticated user data  
- Logout functionality  
- Password Reset (Forgot Password & Reset Password)

The project is designed with a clean, modular structure using modern best practices.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Prisma Middleware for Password Hashing](#prisma-middleware-for-password-hashing)
- [License](#license)

---

## Features

- **User Registration:**  
  Registers a new user with a plain-text password that is auto-hashed (using Prisma middleware or controller logic) and generates an email verification token.

- **Email Verification:**  
  A verification link is sent via Mailtrap to verify the email address. Once clicked, the user's status is updated to verified.

- **User Login:**  
  Authenticates the user using a JWT token that is set as a cookie for subsequent requests.

- **Protected Routes:**  
  Secure endpoints such as fetching the current user's profile are protected by middleware that verifies the JWT token.

- **Logout:**  
  Clears the authentication token (cookie) on the client to log out the user.

- **Password Reset:**  
  Users can request a password reset token via email and then reset their password securely.

---

## Tech Stack

- **Node.js** & **Express:** Server-side application and REST API.
- **Neon PostgreSQL:** Managed PostgreSQL database hosted on Neon.
- **Prisma ORM:** Database access layer with support for middleware.
- **JWT:** JSON Web Token for authentication.
- **bcryptjs:** Password hashing.
- **Nodemailer:** Sending emails (using Mailtrap for testing).
- **ES Modules:** Using native ES module syntax in Node.js.

---

## Project Structure

```
User-Authentication-Neon-PostgreSQL/
├── prisma/
│   ├── schema.prisma              # Prisma database schema file
├── src/
│   ├── controllers/
│   │   └── user.controllers.js   # Controller functions for auth routes
│   ├── middleware/
│   │   └── user.middleware.js    # Middleware for JWT authentication
│   ├── routes/
│   │   └── user.routes.js        # Express routes for user endpoints
│   ├── generated/
│   │   └── prisma/               # (Optional) Custom generated Prisma client folder (if set in schema)
│   ├── prismaClient.js           # Custom Prisma client with middleware (if used)
│   └── index.js                  # Main entry point for Express server
├── .env                          # Environment variables (should be in .gitignore)
├── package.json                  # Project dependencies and scripts
└── README.md                     # This file
```

---

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Dikshant-Koriwar/user-auth-backend-PostgreSQL.git
   cd User-Authentication-Neon-PostgreSQL
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory with the following content (adjust values as needed):

   ```env
   DATABASE_URL="postgresql://neondb_owner:npg_mtMTuBQg1Pz9@ep-muddy-cell-a5084cbl-pooler.us-east-2.aws.neon.tech/User-Auth?sslmode=require"
   JWT_SECRET="your_jwt_secret"
   NODE_ENV=development
   BASE_URL=http://localhost:3000

   MAILTRAP_HOST="your_mailtrap_host"
   MAILTRAP_USERNAME="your_mailtrap_username"
   MAILTRAP_PASSWORD="your_mailtrap_password"
   MAILTRAP_SENDER_EMAIL="your_sender_email@example.com"
   ```

4. **Generate Prisma Client:**

   If you are using the default generator (or a custom output), run:

   ```bash
   npx prisma generate
   ```

5. **Run Database Migrations (if any):**

   If you have created migrations using Prisma Migrate, run:

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Start the Server:**

   ```bash
   npm start
   ```

   Your server should now be running on [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Your `.env` file should include:

- `DATABASE_URL`: PostgreSQL connection string (hosted on Neon)
- `JWT_SECRET`: Secret key for JWT signing
- `NODE_ENV`: Set to development or production
- `BASE_URL`: Base URL for your API (e.g., `http://localhost:3000`)
- Mailtrap configuration:
  - `MAILTRAP_HOST`
  - `MAILTRAP_USERNAME`
  - `MAILTRAP_PASSWORD`
  - `MAILTRAP_SENDER_EMAIL`

---

## API Endpoints

All endpoints are prefixed with `/api/v1/users`.

1. **Register User**  
   - **Method:** POST  
   - **Endpoint:** `/register`  
   - **Body:** JSON with `name`, `email`, `password`

2. **Verify User**  
   - **Method:** GET  
   - **Endpoint:** `/verify/:token`  
   - Replace `:token` with the verification token from email.

3. **Login User**  
   - **Method:** POST  
   - **Endpoint:** `/login`  
   - **Body:** JSON with `email`, `password`

4. **Get Logged-In User Profile**  
   - **Method:** GET  
   - **Endpoint:** `/me`  
   - Protected route (requires a valid JWT cookie or Authorization header)

5. **Logout User**  
   - **Method:** GET  
   - **Endpoint:** `/logout`  
   - Clears authentication cookie.

6. **Forgot Password**  
   - **Method:** POST  
   - **Endpoint:** `/forgot-password`  
   - **Body:** JSON with `email` to receive a reset token via email.

7. **Reset Password**  
   - **Method:** POST  
   - **Endpoint:** `/reset-password/:token`  
   - Replace `:token` with the reset token from email; **Body** should include the new `password`.

---

## Testing with Postman

1. **Register User:**  
   Send a POST request to `/api/v1/users/register` with JSON body:
   ```json
   {
     "name": "Ram",
     "email": "ram@example.com",
     "password": "YourSecretPassword"
   }
   ```
   Check Mailtrap to retrieve the verification token.

2. **Verify User:**  
   Send a GET request to `/api/v1/users/verify/<token>` replacing `<token>` with the token from email.

3. **Login User:**  
   Send a POST request to `/api/v1/users/login` with JSON:
   ```json
   {
     "email": "ram@example.com",
     "password": "YourSecretPassword"
   }
   ```
   Look for a JWT token in the response and in Postman’s cookie manager.

4. **Get Profile:**  
   Send a GET request to `/api/v1/users/me` using the JWT token in the Authorization header or letting cookies attach automatically.

5. **Logout:**  
   Send a GET request to `/api/v1/users/logout` to clear the authentication cookie.

6. **Forgot Password & Reset Password:**  
   Test the password reset flow by first sending a POST to `/api/v1/users/forgot-password` with the email, checking Mailtrap for the reset token, and then sending a POST to `/api/v1/users/reset-password/<resetToken>` with a new password.

---

## Prisma Middleware for Password Hashing

If you prefer automatic password hashing on every create/update, you can add Prisma middleware. See [Prisma Middleware in the Documentation](https://www.prisma.io/docs/concepts/components/prisma-client/middleware) for details.

Example middleware that you can add in a file like `prismaClient.js`:

```js
// prismaClient.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "User") {
    // For create actions:
    if (params.action === "create") {
      if (params.args.data.password) {
        if (!params.args.data.password.startsWith("$2a$")) {
          params.args.data.password = await bcrypt.hash(params.args.data.password, 10);
        }
      }
    }
    // For update actions:
    if (params.action === "update" || params.action === "updateMany") {
      if (params.args.data && params.args.data.password) {
        if (!params.args.data.password.startsWith("$2a$")) {
          params.args.data.password = await bcrypt.hash(params.args.data.password, 10);
        }
      }
    }
  }
  return next(params);
});

export default prisma;
```

Then, in your controllers, import this customized Prisma client:

```js
import prisma from "../prismaClient.js";
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
#   u s e r - a u t h - b a c k e n d - p o s t g r e s  
 