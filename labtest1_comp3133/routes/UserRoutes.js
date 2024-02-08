const express = require('express');
const User = require('../models/User');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html'); 
});

app.post('/signup', async (req, res) => {
    const { username, firstname, lastname, password, createon } = req.body;

    if (!username || !firstname || !lastname || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        const newUser = new User({ username, firstname, lastname, password, createon });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.password !== password) {
            return res.status(401).send('Incorrect password');
        }

        res.status(200).send('Login successful');
        res.redirect('/rooms');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const rooms = ['devops', 'cloud computing', 'covid19', 'sports', 'nodeJS'];

app.get('/rooms', (req, res) => {
    // Assuming rooms.html is located in a public directory
    res.sendFile(__dirname + '/rooms.html');
});

app.get('/rooms/:room', (req, res) => {
    const room = req.params.room;

    // Check if the room exists in the list of available rooms
    if (rooms.includes(room)) {
        // Logic for joining the room
        res.send(`You have joined the ${room} room.`);
    } else {
        res.status(404).send('Room not found.');
    }
});


module.exports = app