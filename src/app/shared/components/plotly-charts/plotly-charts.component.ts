import { Component, EventEmitter, Input, Output, OnInit, ElementRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

class CustomHTMLElement extends HTMLElement {
  constructor() {
    super();
  }

  on(event_type, cb) {

  }
}

declare var Plotly: any;
@Component({
  selector: 'app-plotly-charts',
  templateUrl: './plotly-charts.component.html',
  styleUrls: ['./plotly-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class PlotlyChartsComponent implements OnInit {
  @Input() data: any;
  @Input() layout: any;
  @Input() options: any;
  @Input() type: any;
  @Input() id: any;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log(this.id);
    let elementExists = <CustomHTMLElement>document.getElementById(this.id);
    if(elementExists != null) {
      Plotly.newPlot(this.id, this.data, this.layout, this.options);
      if (this.type != 'pie') {
        let hoverInfo = <CustomHTMLElement>document.getElementById(this.id+'_hover');
        elementExists.on('plotly_hover', function(data){
          var infotext = data.points.map(function(d){
            return d.text;
          });

          hoverInfo.innerHTML = infotext.join('');
        });

        elementExists.on('plotly_unhover', function(data){
          hoverInfo.innerHTML = '';
        });
      }
    }
  }
}
