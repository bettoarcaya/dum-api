import { SocketServer, ServerEvents } from './Server';
import { BoardDriver } from './Drivers';

const server = new SocketServer();
server.io.on(ServerEvents.CONNECT, (socket: any) => {
    console.log('A client has connected');
});

/*
const driver = new BoardDriver();
driver.board.on('ready', () => {
    const server = new SocketServer();
    server.io.on(ServerEvents.CONNECT, (socket: any) => {
        console.log('A client has connected');
    });
});
*/