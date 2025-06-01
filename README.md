website url [website]( https://url-gen-frontend.onrender.com)
linkedin [link](https://www.linkedin.com/in/vansh-nagar-469648346/)

# 🔗 URL-GEN

URL-GEN is a full-stack web application that allows users to shorten URLs, manage their links, and track analytics. Built with **Node.js**, **Express**, **MongoDB**, and **React**, it offers a seamless experience for URL shortening and management.

---

## 🚀 Features

- ✅ User Authentication with JWT
- 🔗 URL Shortening
- 📊 Analytics Tracking
- 🧑‍💼 User Dashboard
- 📱 Fully Responsive Design

---

## 🛠️ Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/vansh-nagar/URL-GEN.git
cd URL-GEN
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

Start the backend:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📚 API Endpoints

### 🔐 Auth Routes

#### POST `/api/auth/register`

Register a new user.

```json
{
  "username": "yourusername",
  "email": "you@example.com",
  "password": "yourpassword"
}
```

#### POST `/api/auth/login`

Log in as an existing user.

```json
{
  "email": "you@example.com",
  "password": "yourpassword"
}
```

Returns a JWT token.

---

### 🔗 URL Routes

#### POST `/api/url/shorten`

Shorten a long URL.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Body**:

```json
{
  "longUrl": "https://example.com"
}
```

**Response**:

```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

---

#### GET `/api/url/:code`

Redirects to the original URL.

---

#### GET `/api/url/user`

Returns all shortened URLs for the authenticated user.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

---

#### DELETE `/api/url/:id`

Delete a shortened URL.

**Headers**:

```
Authorization: Bearer <jwt-token>
```

**Response**:

```json
{
  "message": "URL deleted successfully"
}
```

---

## 📂 Project Structure

```
URL-GEN/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
├── .env
└── README.md
```

---

## 🧪 Testing

Use **Postman** or **cURL** to test the API. Always provide the JWT token in the `Authorization` header for protected routes.

---

## 📄 License

Licensed under the MIT License.

---

## 🙌 Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://reactjs.org/)
- [JWT.io](https://jwt.io/)
