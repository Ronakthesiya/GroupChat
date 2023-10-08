const express = require("express")
var app = express();
var server = app.listen(3000);
const io=require('socket.io')(server,{
    cors: {
        origin: '*',
      }
});

const users = {};

io.on('connection', socket => {

    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
        socket.emit('disply',name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})

