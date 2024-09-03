const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { Login, User, Room, Chat } = require('./schema.js');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());  // Use express' built-in JSON parser
app.use(cors());


async function connectTodb() {
    try {
        await mongoose.connect('mongodb+srv://charubalab:Charu2004@cluster0.tktmk2c.mongodb.net/ChatApplication?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("DB connection established");
    } catch (error) {
        console.error("Couldn't connect to DB:", error);
    }
}
connectTodb();

mongoose.connection.on('error', err => {
    console.error(`DB connection error: ${err.message}`);
});




const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // React app
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User with Id: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING on port 3001");
});

app.post('/add-Login', async function (request, response) {
    console.log('Received request to /add-Login with body:', request.body);
    try {
        const newLogin = await Login.create({
            email: request.body.email,
            password: request.body.password
        });
        response.status(200).json({ status: "Inserted successfully", newLogin });
    } catch (error) {
        console.error('Error occurred while adding login:', error.message);
        response.status(400).json({
            "error-occurrence": error.message,
            "status": "Not inserted successfully"
        });
    }
});


app.post('/add-User', async function(request, response) {
    try {
        await User.create({
            "email":request.body.email,
            "firstname": request.body.firstname,
            "lastname": request.body.lastname
        });
        response.status(200).json({ "status": "inserted successfully" });
    } catch (error) {
        response.status(400).json({
            "error-occurrence": error,
            "status": "not inserted successfully"
        });
    }
});

app.post('/add-Room', async function(request, response) {
    try {
        await Room.create({
            author: request.body.author,
            room: request.body.room
        });
        response.status(200).json({ status: "inserted successfully" });
    } catch (error) {
        response.status(400).json({
            "error-occurrence": error.message,
            "status": "not inserted successfully"
        });
    }
});

app.post('/add-Chat', async function(request, response) {
    try {
        await Chat.create({
            author: request.body.author,
            time: request.body.time,
            content: request.body.message
        });
        response.status(200).json({ status: "inserted successfully" });
    } catch (error) {
        response.status(400).json({
            "error-occurrence": error,
            "status": "not inserted successfully"
        });
    }
});
