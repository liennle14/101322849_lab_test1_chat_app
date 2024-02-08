const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes.js');

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://dbuser:VNGcdYVMGXdLQz0a@cluster0.wihv2ix.mongodb.net/comp3133?retryWrites=true&w=majority", {
}).then(success => {
  console.log(`MongoDB connected ${success}`)
}).catch(err => {
  console.log(`Error while MongoDB connection ${err}`)
});

app.use(userRouter);

//http://localhost:8081/signup
//http://localhost:8081/login
app.listen(8081, () => { console.log('Server is running...') });