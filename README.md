# E-shop — E-Commerce Backend API

A complete REST API for an e-commerce platform built with Node.js, Express.js and MongoDB. Features user authentication, role-based authorization, product management and a full order system.

---

## Live Demo

> Deploy on Render and paste your URL here
> Example: `https://shopeasy-backend.onrender.com`

---

## 🛠️ Technologies Used

- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **MongoDB** — Database
- **Mongoose** — MongoDB object modeling
- **JWT (jsonwebtoken)** — Authentication tokens
- **bcryptjs** — Password hashing
- **dotenv** — Environment variables
- **cors** — Cross-origin resource sharing
- **nodemon** — Development auto-restart

---

## ✨ Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Role-based authorization (user and admin)
- Admin-protected product management (create, update, delete)
- Public product browsing (get all, get by ID)
- Complete order system with real price calculation from database
- Order status tracking (pending, processing, delivered, cancelled)
- Centralized error handling throughout
- Input validation on all endpoints

---

## 📁 Project Structure

```
shopeasy-backend/
├── config/
│   └── db.js                  ← MongoDB connection
├── controllers/
│   ├── authController.js      ← register and login logic
│   ├── productController.js   ← product CRUD logic
│   └── orderController.js     ← order logic
├── middleware/
│   ├── authMiddleware.js      ← JWT verification
│   └── adminMiddleware.js     ← admin role check
├── models/
│   ├── user.model.js          ← user schema
│   ├── product.model.js       ← product schema
│   └── order.model.js         ← order schema
├── routes/
│   ├── auth.route.js          ← auth endpoints
│   ├── product.route.js       ← product endpoints
│   └── order.route.js         ← order endpoints
├── .env                       ← environment variables (not in repo)
├── .gitignore
├── app.js                     ← express config and routes
├── package.json
└── server.js                  ← server entry point
```

---

## 🔗 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login and get JWT token | No |
| GET | `/profile` | Get logged in user profile | Yes |

### Products — `/api/product`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/allProducts` | Get all products | No |
| GET | `/:id` | Get single product by ID | No |
| POST | `/createProduct` | Create new product | Admin only |
| PUT | `/updateProduct/:id` | Update product | Admin only |
| DELETE | `/deleteProduct/:id` | Delete product | Admin only |

### Orders — `/api/order`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/placeOrder` | Place a new order | User |
| GET | `/myOrder` | Get logged in user's orders | User |
| GET | `/allOrders` | Get all orders | Admin only |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v16+
- MongoDB Atlas account (free)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/shubrobarua007/E-shop.git
cd E-shop
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env` file in the root folder**
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
```

**4. Start the server**
```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

---

## 🧪 Testing the API

Use [Postman](https://postman.com) to test endpoints.

### Register a user
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "Ali",
  "email": "ali@test.com",
  "password": "123456"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "ali@test.com",
  "password": "123456"
}
```

### Place an order (requires JWT token)
```
POST /api/order/placeOrder
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "products": [
    { "productId": "product_id_here", "quantity": 2 },
    { "productId": "product_id_here", "quantity": 1 }
  ]
}
```

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port number (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT token signing |

---

## 👤 Author

**Shubrobarua**
- GitHub: [@shubrobarua007](https://github.com/shubrobarua007)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
