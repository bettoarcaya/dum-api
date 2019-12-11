import { Component } from '@angular/core';
import { BoardService } from './core/services/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dum-webapp';

  constructor() {
  }
}
