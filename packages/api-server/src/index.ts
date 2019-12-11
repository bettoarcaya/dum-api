import { SocketServer, ServerEvents } from './Server';
import { BoardDriver } from './Drivers';

const server = new SocketServer();
server.io.on(ServerEvents.CONNECT, (socket: any) => {
    console.log('A client has connected');
});

let x = 15;
setInterval(() => {
    x += x * 2;
    server.io.emit('output', {
        output: x,
    });
}, 1000);

// const driver = new BoardDriver();
// const five = require('johnny-five');

/*driver.board.on('ready', () => {
    /*const server = new SocketServer();
    // server.io.on(ServerEvents.CONNECT, (socket: any) => {
    //   console.log('A client has connected');
    // });
    let inputInfo: number = 0;
    //entrada analogica
    let analogInput = new five.Pin({
        pin: "A0"
    });

    //salida de voltaje desde la placa
    let vccPin = new five.Pin({
        pin: 7
    });

    //capturamos la lectura de la salida del circuito...
    analogInput.read(function(error: any, value: any){
        inputInfo = value;
    });

    driver.board.loop( 1000, () => {
        //cada un segundo encendemos o apagamos la alimentacion del circuito segun el estado...
        vccPin.query( (state: any) => {
            (state.value == 1) ? vccPin.low() : vccPin.high();
            //console.log( state.value );
        });
        
    });

    driver.board.loop(250, () => {
        //console.log(inputInfo);
        server.io.emit('output', { 
            output:  inputInfo
        });
    });
});*/
