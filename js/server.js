const io = require('socket.io')(3000);

const users = {};

// Console command to start server:
// "npm run devStart" as set in package.json
io.on('connection', socket => {

    // Connect
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name)
    });

    // Send
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    });

    // Disconnect and remove old user data
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id]
    })
});