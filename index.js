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
    let inputInfo = null;

    app.use(cors());

    //entrada analogica
    let analogInput = new five.Pin({
        pin: "A0"
    });

    //salida de voltaje desde la placa
    let vccPin = new five.Pin({
        pin: 7
    });

    //capturamos la lectura de la salida del circuito...
    analogInput.read(function(error, value){
        inputInfo = value;
    });

    board.loop( 1000, () => {
        //cada un segundo encendemos o apagamos la alimentacion del circuito segun el estado...
        vccPin.query( state => {
            (state.value == 1) ? vccPin.low() : vccPin.high();
            //console.log( state.value );
        });
        
    });

    board.loop(250, () => {
        //console.log(inputInfo);
    });
    

    /////////////////  RUTAS //////////////////////////
    //ruta de prueba..
    app.get('/test', (req, res) => {
        // crea conexion entre el servidor y el cliente... 
        io.on('connection', (socket)=>{ 
            console.log('New connection'); 
            //emitiendo mensaje al cliente cada 1 segundo...
            setInterval(function(){
                socket.emit('output', { 
                    output: 'socket message each second' 
                }); 
            }, 1000);
            
            // desconexion del cliente 
            socket.on('disconnect', ()=>{ 
                console.log('disconnected from user'); 
            }); 
        }); 
        res.sendFile(__dirname + '/index.html');
    });

    //endpoint para la salida.
    app.get('/salida', (req, res) => {
        // crea conexion entre el servidor y el cliente... 
        io.on('connection', (socket)=>{ 
            console.log('New connection'); 
            //emitiendo mensaje al cliente cada 1 segundo...
            setInterval(function(){
                socket.emit('output', { 
                    output:  inputInfo
                }); 
            }, 250);
            
            // desconexion del cliente 
            socket.on('disconnect', ()=>{ 
                console.log('disconnected from user'); 
            }); 
        });

    });
    server.listen(3000, () => {
        console.log('Server on: localhost:3000')
    });
});