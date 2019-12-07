import { Board } from 'johnny-five';

export class BoardDriver {
    private _board: Board;

    constructor() {
        this._board = new Board();
    }

    get board(): Board {
        return this._board;
    }
}