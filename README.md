

# 📚 Library Management System (Node.js + Express + MongoDB)

A RESTful API for managing a library system.  
It includes user authentication, book management, and transaction handling for borrowing and returning books.  

Built with:
- **Express.js** for the backend API
- **MongoDB + Mongoose** for database
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Joi** for input validation

---

## 🚀 Features

### **User Management**
- User registration with input validation
- Secure password hashing using Bcrypt
- User login with JWT authentication
- User profile retrieval

### **Book Management**
- Add, update, delete books (Admin only)
- List all books with pagination & sorting
- Track available copies

### **Transaction Management**
- Borrow books with availability checks
- Return books and update available copies
- View all transactions for a specific user

---

## 📂 Project Structure
project-root/
│── src/
│ ├── DB/ # Database models
│ ├── middleware/ # Auth & validation middlewares
│ ├── modules/
│ │ ├── user/ # User routes, controller, validation
│ │ ├── book/ # Book routes, controller, validation
│ │ ├── transaction/ # Transaction routes, controller, validation
│── .env # Environment variables
│── package.json
│── README.md


---

## ⚙️ Installation & Setup

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/DamarisM87/route-library-managemt-system.git
cd route-library-managemt-system
2️⃣ Install dependencies
npm install
3️⃣ Set up environment variables
Create a .env file in the project root and add:

PORT=your port
MONGO_URI=mongodb://127.0.0.1:27017/your db
SALT_ROUNDS=your salt rounds
ACCESS_TOKEN_USER=your_user_jwt_secret
ACCESS_TOKEN_ADMIN=your_admin_jwt_secret
REFRESH_TOKEN_USER=your_refresh_user_jwt_secret
REFRESH_TOKEN_ADMIN=your_refresh_admin_jwt_secret
4️⃣ Run the application
npm run dev
The API will start on:

http://localhost:5000
📬 API Endpoints
Auth
Method	Endpoint	Auth Required	Description
POST	/api/users/register	❌ No	Register a new user
POST	/api/users/login	❌ No	Login & get JWT
GET	/api/users/profile	✅ Yes	Get user profile
Books
Method	Endpoint	Auth Required	Role	Description
POST	/api/books	✅ Yes	Admin	Add a book
GET	/api/books	✅ Yes	Any	Get all books
PUT	/api/books/:id	✅ Yes	Admin	Update book
DELETE	/api/books/:id	✅ Yes	Admin	Delete book
Transactions
Method	Endpoint	Auth Required	Description
POST	/api/transactions/borrow	✅ Yes	Borrow a book
PUT	/api/transactions/return/:id	✅ Yes	Return a book
GET	/api/transactions/user	✅ Yes	View user's transactions
🛠 Technologies Used
Node.js (Backend)

Express.js (Framework)

MongoDB + Mongoose (Database)

JWT (Authentication)

Bcrypt (Password Hashing)

Joi (Validation)




---

