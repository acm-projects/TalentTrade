require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');
const admin = require('./config/firebaseAdmin');
const socketio = require('socket.io');

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

const server = app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

const io = socketio(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`New user connected with socket id: ${socket.id}`);

    socket.on('setup', (userId) => {
        socket.join(userId);
        socket.emit('connected');
        console.log(`User ${userId} setup completed`);
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log(`User joined chat room: ${room}`);
    });

    socket.on('typing', (room) => {
        console.log(`User is typing in room: ${room}`);
        socket.in(room).emit('typing');
    });

    socket.on('stop typing', (room) => {
        console.log(`User stopped typing in room: ${room}`);
        socket.in(room).emit('stop typing');
    });

    socket.on('new message', (newMessageReceived) => {
        const chat = newMessageReceived.chat;

        if (!chat.users) {
            console.log('chat.users not defined');
            return;
        }

        chat.users.forEach(user => {
            if (user._id === newMessageReceived.sender._id) return;

            socket.in(user._id).emit('message received', newMessageReceived);
            console.log(`New message sent to user: ${user._id}`);
        });

        socket.in(chat._id).emit('message received', newMessageReceived);
        console.log(`New message sent to chat room: ${chat._id}`);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected with socket id: ${socket.id}`);
    });
});

const connectToMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

connectToMongoose();