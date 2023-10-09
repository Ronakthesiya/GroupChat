const express = require("express")
var app = express();

var server = app.listen(3000);
const io=require('socket.io')(server,{
    cors: {
        origin: '*',
      }
});

const users = {};
let arr= [];

io.on('connection', socket => {

    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
        socket.emit('disply',name,arr);
        arr.push(name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message=>{
        arr=arr.filter((n)=>{
            if(n===users[socket.id]){

            }else{
                return n;
            }
        })
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})
