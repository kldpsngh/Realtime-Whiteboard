const express=require('express');
const http=require('http');
const SocketIO=require('socket.io');
const app=express();
const server=http.createServer(app);
const io=SocketIO(server);


app.use('/',express.static(__dirname+'/public_static'));

server.listen(1234,()=>console.log("server started at http://localhost:1234"));