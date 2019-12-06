const five = require('johnny-five');
const express = require('express');
const cors = require('cors');
const board = new five.Board();
const socketIO = require('socket.io');
const http = require('http');
const port = 3000;

board.on('ready', () => {
    const app = express();
    let server = http.createServer(app); 
    let io = socketIO(server);

    app.use(cors());

    let analogInput = new five.Pin({
        pin: "A0"
    });

    let vccPin = new five.Pin({
        pin: 7
    });

    vccPin.high();

    // make connection with user from server side 
    io.on('connection', (socket)=>{ 
        console.log('New connection'); 
        //emit message from server to user 
        socket.emit('newMessage', { 
            msg: 'random message' 
        }); 
        
        // when server disconnects from user 
        socket.on('disconnect', ()=>{ 
        console.log('disconnected from user'); 
        }); 
    }); 

    analogInput.read(function(error, value){
        if(value == 1023){
            vccPin.low();
        }
        if( value == 0 ){
            vccPin.high();
        }
        console.log(value);
    });
    

    app.get('/', (req, res) => res.send('Ready!'));
    app.listen(8080, () => console.log('Server on: localhost:8080'));
    server.listen(port);
});