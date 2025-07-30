# Chat-App

A real-time chat application with a modern UI, designed to facilitate seamless communication between users.

## ✨ Features

- User registration and authentication
- Public and private chat channels
- Real-time messaging
- Persistent message history

## 🚀 Technologies Used

- **Backend**: Node.js, Express
- **Real-time**: Socket.io (or WebSocket)
- **Database**: MongoDB / PostgreSQL / SQLite
- **Frontend**: React + Material UI (or similar)
- **Others**: JWT for authentication, dotenv for configuration

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CarlosLopez98/chat-app.git
   cd chat-app
   ```

2. Install dependencies for both server and client:
   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the backend directory using `.env.example` as a template:
   ```env
   PORT=4000
   DB_URI=mongodb://localhost:27017/chat_app
   JWT_SECRET=your_secret_key
   ```

4. Run the app:
   ```bash
   # Start backend
   npm run dev

   # Start frontend (in another terminal)
   cd frontend
   npm start
   ```

5. Open your browser at `http://localhost:3000` to see the app in action.

## 📁 Project Structure

```
chat-app/
├── backend/              # REST API and Socket.io logic
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/             # React client
│   ├── public/
│   ├── src/
│   ├── components/
│   └── App.js
├── .env.example
├── README.md
└── package.json
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

For questions or suggestions, feel free to open an issue on GitHub.
