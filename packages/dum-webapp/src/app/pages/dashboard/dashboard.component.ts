import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/core/services/board.service';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  view: any[] = [1600, 1400];
  theme: string = 'dark';
  colorScheme: string = 'cool';
  schemeType: string = 'ordinal';
  plotData: any;
  mathText = '3 - 1.5*sin(x) + cos(2*x) - 1.5*abs(cos(x))';
  mathFunction: (o: any) => any;
  animations: boolean = true;
  legendTitle = 'Legend';
  legendPosition = 'right';
  gradient: boolean = false;
  showXAxis = true;
  showYAxis = true;
  autoScale: boolean = true;
  timeline: boolean = false;
  showGridLine: boolean = true;
  curves = {
    Cardinal: shape.curveCardinal,
  };
  rangeFillOpacity: number = 0.15;
  roundDomains: boolean = false;
  tooltipDisabled: boolean = false;
  trimXAxisTicks = true;
  trimYAxisTicks = true;
  maxXAxisTickLength = 16;
  maxYAxisTickLength = 16;

  constructor(private boardService: BoardService) {
    this.plotData = this.generatePlotData();
    this.mathFunction = this.getFunction();
   }

  ngOnInit() {
    this.boardService.getOutput()
      .subscribe(output => {
        console.log(output);
      });
  }

  generatePlotData() {
    if (!this.mathFunction) {
      return [];
    }
    const twoPi = 2 * Math.PI;
    const length = 25;
    const series = Array.apply(null, { length }).map((d, i) => {
      const x = i / (length - 1);
      const t = x * twoPi;
      return {
        name: ~~(x * 360),
        value: this.mathFunction(t)
      };
    });

    return [
      {
        name: this.mathText,
        series
      }
    ];
  }

  getFunction(text = this.mathText) {
    try {
      text = `with (Math) { return ${this.mathText} }`;
      // tslint:disable-next-line:function-constructor
      const fn = new Function('x', text).bind(Math);
      return typeof fn(1) === 'number' ? fn : null;
    } catch (err) {
      return null;
    }
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }
}
