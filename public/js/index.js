var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'sevak',
        text: 'hello Karen'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function (email) {
//     console.log('New Email ', email);
// });

// socket.emit('createEmail', {
//     From: 'client@gmail.com',
//     text: 'the first email created',
//     createdAt: 321
// });
// socket.on('message', function(message) {
//     console.log(message);
// });

socket.on('newMessage', function(message) {
    console.log(message);
});

