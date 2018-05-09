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
           x1:data.last_x,y1:data.last_y,x2:data.curr_x,y2:data.curr_y,color:data.color
       });
    });

});

server.listen(1234,()=>console.log("server started at http://localhost:1234"));