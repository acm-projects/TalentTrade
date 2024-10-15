require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');
const admin = require('./config/firebaseAdmin');
const http = require('http');

const app = express();
const checkFirebaseAdmin = (req, res, next) => {
    if (!admin.apps.length) {
        return res.status(500).json({ error: 'Firebase Admin not initialized' });
    }
    next();
};

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    credentials: true
}));
app.use('/api', checkFirebaseAdmin);

app.get('/', (req, res) => {
    res.json({ "From the backend side": "Welcome to TalentTrade!" });
});

app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);


/* const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

let activeConnections = 0;

io.on('connection', (socket) => {
    activeConnections++;
    console.log(`User connected: ${socket.id}, Active connections: ${activeConnections}`);

    socket.on('disconnect', () => {
        activeConnections--;
        console.log(`User disconnected: ${socket.id}, Active connections: ${activeConnections}`);
    });
});

const connectToMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        server.listen(4000, () => {
            console.log('Server and socket.io listening on port 4000');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
*/

const connectToMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB and Listening on port',process.env.PORT)
    })
  } catch (error) {
    console.log("error")
  }
}

connectToMongoose();
