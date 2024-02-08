const express = require('express');
const User = require('../models/User');
const app = express();
const path = require('path');

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
        console.log('User logged in successfully')
        res.redirect('/rooms');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const rooms = ['devops', 'cloud computing', 'covid19', 'sports', 'nodeJS'];

app.get('/rooms', (req, res) => {
    res.sendFile(__dirname + '/rooms.html');
});

app.get('/rooms/:room', (req, res) => {
    const room = req.params.room;
    if (rooms.includes(room)) {
        res.sendFile(path.join(__dirname, 'group_chat.html'));
    } else {
        res.status(404).send('Room not found.');
    }
});


module.exports = app