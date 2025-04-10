# E-commerce API

This is an API for e-commerce written in Node.js, Express.js, and MongoDB.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api
npm install
```

## Usage

Start the server:

```bash
npm run dev
```

The server will start on port 3000. You can access it at http://localhost:3000.

# List of dependencies

- express
- express-rate-limit
- cors
- dotenv
- mongoose
- morgan
- bcryptjs
- helmet
- joi
- jsonwebtoken
- winston
- nodemailer

# List of devDependencies

- nodemon

# Example of .env file

```bash
PORT=3000
NODE_ENV=development
API_VERSION=/api/v1
APP_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/ecommerce

CORS_ORIGIN=http://localhost:3000

JWT_SECRET=secret
JWT_EXPIRES_IN=1d

EMAIL_USER=email
EMAIL_PASS=password
```

## Endpoints

The API has the following endpoints:

- `/api/v1/auth/register`: Register a new user
- `/api/v1/auth/login`: Login a user
- `/api/v1/auth/verify-email/:token`: Verify a user's email
- `/api/v1/auth/forgot-password`: Send a password reset email
- `/api/v1/auth/reset-password/:token`: Reset a user's password
