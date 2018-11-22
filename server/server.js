const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message.js');
// .generateMessage;

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.')
    // {
        // from: 'Admin',
        // text: 'Welcome to the chat app',
        // createdAt: new Date().getTime()
    // }
    );

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.')
    // {
    //     from: 'Admin',
    //     text: 'New user joined',
    //     createdAt: new Date().getTime()
    // }
    );

    socket.on('createMessage', function(message) {
        io.emit('newMessage', generateMessage(message.from, message.text)
        
        // {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // }
        );
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    // socket.emit('newEmail', {
    //     From: 'sevak@example.com',
    //     text: 'Hi there, this is the first email',
    //     createdAt: 123
    // });

    // socket.on('createEmail', function (newEmail) {
    //     console.log(newEmail);
    // });

    socket.on('disconnect', (socket) => {
        console.log('user was disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});