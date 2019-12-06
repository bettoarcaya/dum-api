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

    // crea conexion entre el servidor y el cliente... 
    io.on('connection', (socket)=>{ 
        console.log('New connection'); 
        //emitiendo mensaje al cliente cada 1 segundo...
        setInterval(function(){
            socket.emit('newMessage', { 
                msg: 'random message' 
            }); 
        }, 1000);
        
        // desconexion del cliente 
        socket.on('disconnect', ()=>{ 
            console.log('disconnected from user'); 
        }); 
    }); 

    inputInfo = analogInput.read(function(error, value){
        if(value == 1023){
            vccPin.low();
        }
        if( value == 0 ){
            vccPin.high();
        }
    });
    

    app.get('/test', (req, res) => {
        //res.send('Ready!');
        res.sendFile(__dirname + '/index.html');
    });
    server.listen(3000, () => {
        console.log('Server on: localhost:3000')
    });
});