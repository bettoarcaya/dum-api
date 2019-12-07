import Express from 'express';
import SocketIO from 'socket.io';
import { createServer, Server } from 'http';

export class SocketServer {
    public static readonly PORT: number = 3000;

    private _app: Express.Application;
    private _server: Server;
    private _io: SocketIO.Server;
    private _port: number | string;

    constructor() {
        this._app = Express();
        this._server = createServer(this._app);
        this._io = SocketIO(this._server);
        this._port = process.env.PORT || SocketServer.PORT;
        this.listen();
    }

    get app(): Express.Application {
        return this._app;
    }

    get io(): SocketIO.Server {
        return this._io;
    }

    private listen(): void {
        this._server.listen(this._port, () => {
            console.log('Running server on port: %s', this._port);
        });
    }
}