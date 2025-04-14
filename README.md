Here’s your **final cleaned-up and properly formatted `README.md`** — perfect for displaying on GitHub:

---

```markdown
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

- **User Registration:** Registers a new user and hashes the password securely.
- **Email Verification:** Sends verification email via Mailtrap and updates user status upon confirmation.
- **User Login:** Authenticates using JWT and stores token in an HTTP-only cookie.
- **Protected Routes:** Accessible only by authenticated users.
- **Logout:** Clears the cookie to logout the user.
- **Forgot & Reset Password:** Users can request password reset via email and securely update it.

---

## Tech Stack

- **Node.js** & **Express** — Server and routing
- **Neon PostgreSQL** — Cloud-hosted PostgreSQL DB
- **Prisma** — ORM for database queries and schema
- **JWT** — For authentication
- **bcryptjs** — For hashing passwords
- **Nodemailer** — For sending emails via Mailtrap
- **ES Modules** — Modern JavaScript module syntax

---

## Project Structure

```
User-Authentication-Neon-PostgreSQL/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── controllers/
│   │   └── user.controllers.js
│   ├── middleware/
│   │   └── user.middleware.js
│   ├── routes/
│   │   └── user.routes.js
│   ├── prismaClient.js
│   └── index.js
├── .env
├── package.json
├── .gitignore
└── README.md
```

---

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Dikshant-Koriwar/user-auth-backend-PostgresSQL.git
   cd user-auth-backend-PostgresSQL
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="your_neon_postgres_url"
   JWT_SECRET="your_jwt_secret"
   NODE_ENV=development
   BASE_URL=http://localhost:3000

   MAILTRAP_HOST="your_mailtrap_host"
   MAILTRAP_USERNAME="your_mailtrap_username"
   MAILTRAP_PASSWORD="your_mailtrap_password"
   MAILTRAP_SENDER_EMAIL="your_email@example.com"
   ```

4. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

5. **Apply migrations to your database:**

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Start the server:**

   ```bash
   npm start
   ```

---

## Environment Variables

| Variable              | Description                                 |
|-----------------------|---------------------------------------------|
| `DATABASE_URL`        | Neon PostgreSQL connection string           |
| `JWT_SECRET`          | Secret key for signing JWT tokens           |
| `NODE_ENV`            | Set to `development` or `production`        |
| `BASE_URL`            | API base URL (e.g. `http://localhost:3000`) |
| `MAILTRAP_HOST`       | Mailtrap SMTP host                          |
| `MAILTRAP_USERNAME`   | Mailtrap username                           |
| `MAILTRAP_PASSWORD`   | Mailtrap password                           |
| `MAILTRAP_SENDER_EMAIL` | Sender email for Mailtrap                 |

---

## API Endpoints

**Base URL:** `/api/v1/users`

| Method | Endpoint                  | Description                            |
|--------|---------------------------|----------------------------------------|
| POST   | `/register`               | Register new user                      |
| GET    | `/verify/:token`          | Verify user with email token           |
| POST   | `/login`                  | Login user                             |
| GET    | `/me`                     | Get current logged-in user             |
| GET    | `/logout`                 | Logout user (clear cookie)             |
| POST   | `/forgot-password`        | Request password reset token           |
| POST   | `/reset-password/:token` | Reset password with provided token     |

---

## Testing with Postman

1. **Register:**

   ```json
   {
     "name": "Ram",
     "email": "ram@example.com",
     "password": "secret123"
   }
   ```

2. **Verify:**  
   Use the verification link from Mailtrap to activate the account.

3. **Login:**

   ```json
   {
     "email": "ram@example.com",
     "password": "secret123"
   }
   ```

4. **Access Profile:**  
   Send a GET request to `/me` with the JWT cookie or token in headers.

5. **Logout:**  
   Send a GET request to `/logout`.

6. **Forgot/Reset Password:**  
   Trigger `/forgot-password`, get token from email, and send new password to `/reset-password/:token`.

---

## Prisma Middleware for Password Hashing

Create `prismaClient.js`:

```js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "User") {
    if (["create", "update", "updateMany"].includes(params.action)) {
      if (params.args.data.password && !params.args.data.password.startsWith("$2a$")) {
        params.args.data.password = await bcrypt.hash(params.args.data.password, 10);
      }
    }
  }
  return next(params);
});

export default prisma;
```

Use it in controllers like this:

```js
import prisma from "../prismaClient.js";
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---
```

---

Let me know if you want me to push it directly to your repo or if you'd like a Markdown download file.