const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
    email:{type:String},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }
});

const RoomSchema = new mongoose.Schema({
    author: { type: String, required: true },
    room: { type: String, required: true }
});

const ChatSchema = new mongoose.Schema({
    author: { type: String, required: true },
    time: { type: String, required: true },
    content: { type: String, required: true }
});

const Login = mongoose.model('Login', LoginSchema);
const User = mongoose.model('User', UserSchema);
const Room = mongoose.model('Room', RoomSchema);
const Chat = mongoose.model('Chat', ChatSchema);

module.exports = { Login, User, Room, Chat };
