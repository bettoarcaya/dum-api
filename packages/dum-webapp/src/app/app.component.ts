import { Component } from '@angular/core';
import { BoardService } from './@core/services/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dum-webapp';

  // BoardService no va acá. O bueno, depende de cómo el homosexual de Rafael
  // vaya a estructurar su mierda. Pero sólo lo puse para probar la conexión con el backend.
  constructor(private boardService: BoardService) {
  }
}
