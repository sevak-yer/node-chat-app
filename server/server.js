const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
    console.log('New user connected');

    // socket.emit('newMessage', {
    //     from: 'karen',
    //     text: 'hello Sevak',
    //     createdAt: 456
    // });

    socket.on('createMessage', function(message) {
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
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