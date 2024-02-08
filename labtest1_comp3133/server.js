const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes.js');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());

mongoose.connect("mongodb+srv://dbuser:VNGcdYVMGXdLQz0a@cluster0.wihv2ix.mongodb.net/comp3133?retryWrites=true&w=majority", {
}).then(success => {
  console.log(`MongoDB connected ${success}`)
}).catch(err => {
  console.log(`Error while MongoDB connection ${err}`)
});

app.use(userRouter);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('chat_message', { username: 'Server', message: 'Welcome to the chat room' });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });

  socket.on('chat_message', (data) => {
      console.log(`Received message from ${data.username}: ${data.message}`);
      io.emit('chat_message', { username: data.username, message: data.message });
  });
});

server.listen(8081, () => {
  console.log('Server is running...')
});