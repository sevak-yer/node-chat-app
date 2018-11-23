var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createMessage', {
    //     from: 'sevak',
    //     text: 'hello Karen'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function (email) {
//     console.log('New Email ', email);
// });

// socket.emit('createMessage', {
//     from: 'Sevak',
//     text: 'Hi'
// }, function (data) {
//     console.log('Got it.' , data)
// });

// socket.on('message', function(message) {
//     console.log(message);
// });

socket.on('newMessage', function(message) {
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    },function (data) {
        console.log('Got it.' , data)
    });
});

