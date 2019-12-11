import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/core/services/board.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.boardService.getOutput()
      .subscribe(output => {
        console.log(output);
      });
  }

}
