import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root',
})
export class BoardService {
    constructor(private socket: Socket) {
    }
}