import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private socket: Socket) {}

  getOutput() {
    return this.socket
      .fromEvent('output')
      .pipe(
        map(data => data['output']),
      );
  }
}
