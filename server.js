const express=require('express');
const http=require('http');
const SocketIO=require('socket.io');
const app=express();
const server=http.createServer(app);
const io=SocketIO(server);


app.use('/',express.static(__dirname+'/public_static'));


io.on('connection',function(socket){


    socket.on('pencil',function(data){
        console.log(data);
       socket.broadcast.emit('pencil',{
           last_x:data.last_x,last_y:data.last_y,curr_x:data.curr_x,curr_y:data.curr_y,color:data.color
       });
    });

});

server.listen(1234,()=>console.log("server started at http://localhost:1234"));