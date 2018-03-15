import { Component } from '@angular/core';

class CustomHTMLElement extends HTMLElement {
  constructor() {
    super();
  }

  on(event_type, cb) {

  }
}

declare var Plotly: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  summary = true;
  plotlyPieLayout: any = {
    title: '',
    autosize: true,
    margin: {
      l: 10,
      r: 10,
      b: 5,
      t: 5,
      pad: 4
    },
    height: 250,
    width: 550
  };
  plotlyAreaLayout: any = {
    title: '',
    margin: {
      l: 30,
      r: 10,
      b: 40,
      t: 5,
      pad: 4
    },
    height: 200,
    width: 550
  };
  plotlyBarLayout: any = {
    title: '',
    margin: {
      l: 150,
      r: 10,
      b: 5,
      t: 5,
      pad: 4
    },
    barmode: 'stack',
    height: 250,
    width: 550,
    showlegend: false
  };
  plotlyOptions: any = { displayModeBar: false };

  categories: any = [];

  data = {
    "Marketing Associate": {
      "sub-categories": ["Behaviour", "Business Growth", "Product Recommendation", "Service"],
      "pie": [1175, 156, 139, 439],
      "stacked-positive": [91.40425532, 75, 69.78417266, 67.42596811],
      "stacked-neutral": [7.489361702, 23.07692308, 23.74100719, 28.92938497],
      "stacked-negative": [1.106382979, 1.923076923, 6.474820144, 3.644646925]
    },
    "Receiving Items Feedback": {
      "sub-categories": ["Delivery associate", "Delivery time", "Product quality"],
      "pie": [431, 304, 53],
      "stacked-positive": [47.5638051, 27.63157895, 16.98113208],
      "stacked-neutral": [35.96287703, 50.65789474, 24.52830189],
      "stacked-negative": [16.47331787, 21.71052632, 58.49056604]
    },
    "Placing Orders Feedback": {
      "sub-categories": ["App/Mobile order", "Feedback on Alternate/New Products", "Feedback on Discontinued Products",
        "Feedback on Existing Products", "Feedback on Substituted Products", "Offline Ordering", "Online Orders", "Replacement",
        "Stock Issues"],
      "pie": [135, 38, 18, 37, 24, 120, 74, 14, 33],
      "stacked-positive": [37.77777778, 71.05263158, 33.33333333, 35.13513514, 16.66666667, 35, 41.89189189, 21.42857143, 15.15151515],
      "stacked-neutral": [51.11111111, 28.94736842, 55.55555556, 51.35135135, 75, 60.83333333, 52.7027027, 57.14285714, 75.75757576],
      "stacked-negative": [11.11111111, 0, 11.11111111, 13.51351351, 8.333333333, 4.166666667, 5.405405405, 21.42857143, 9.090909091]
    },
    "Reasons for Emotion Chosen to Describe Working with Sysco": {
      "sub-categories": ["online", "Product Quality", "Pricing", "Logistics", "Products", "Marketing Associate", "Perspective"],
      "pie": [40, 77, 263, 462, 663, 893, 972],
      "stacked-positive": [65, 57.14285714, 41.44486692, 44.58874459, 50.07541478, 69.20492721, 74.58847737],
      "stacked-neutral": [27.5, 31.16883117, 45.62737643, 43.07359307, 41.77978884, 27.32362822, 21.09053498],
      "stacked-negative": [7.5, 11.68831169, 12.92775665, 12.33766234, 8.14479638, 3.471444569, 4.320987654]
    },
    "Invoicing/Payment Process Feedback": {
      "sub-categories": ["Pricing", "Other Issues", "Alternate Payment", "Credit Issue", "Payment Method", "Invoicing"],
      "pie": [7, 22, 36, 74, 93, 104],
      "stacked-positive": [14.28571429, 31.81818182, 16.66666667, 1.351351351, 64.51612903, 27.88461538],
      "stacked-neutral": [71.42857143, 45.45454545, 69.44444444, 56.75675676, 33.33333333, 53.84615385],
      "stacked-negative": [14.28571429, 22.72727273, 13.88888889, 41.89189189, 2.150537634, 18.26923077]
    }
  }
  selected_category: string = "Marketing Associate";

  constructor() {
  }

  ngOnInit() {
    this.categories = Object.keys(this.data);

    console.log(this.categories);
  }

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    this.plot('pie_1', this.getPieData(this.selected_category), this.plotlyPieLayout,this.plotlyOptions);
    this.plot('stacked_bar_1', this.getStackedBarData(this.selected_category), this.plotlyBarLayout,this.plotlyOptions);
  }

  getPieData(selected_category) {

    return [{
      values: this.data[selected_category]["pie"],
      labels: this.data[selected_category]["sub-categories"],
      type: 'pie'
    }]
  }

  getStackedBarData(selected_category) {

    var trace1 = {
      x: this.data[selected_category]["stacked-negative"],
      y: this.data[selected_category]["sub-categories"],
      name: 'Negative',
      orientation: 'h',
      marker: {
        color: '#F78181',
        width: 1
      },
      type: 'bar'
    };

    var trace2 = {
      x: this.data[this.selected_category]["stacked-neutral"],
      y: this.data[this.selected_category]["sub-categories"],
      name: 'Neutral',
      orientation: 'h',
      type: 'bar',
      marker: {
        color: '#eee',
        width: 1
      }
    };

    var trace3 = {
      x: this.data[this.selected_category]["stacked-positive"],
      y: this.data[this.selected_category]["sub-categories"],
      name: 'Positive',
      orientation: 'h',
      type: 'bar',
      marker: {
        color: '#01DFA5',
        width: 1
      }
    };

    return [trace1, trace2, trace3];
  }

  getDimData() {


    var trace1 = {
      x: ['Nov-17', 'Dec-17', 'Jan-18', 'Feb-18', 'Mar-18'],
      y: [200, 250, 230, 210, 180],
      fill: 'tozeroy',
      type: 'scatter',
      mode: 'none',
      name: 'Positive Comments'
    };

    var trace2 = {
      x: ['Nov-17', 'Dec-17', 'Jan-18', 'Feb-18', 'Mar-18'],
      y: [300, 320, 326, 290, 280],
      fill: 'tonexty',
      type: 'scatter',
      mode: 'none',
      name: 'Total Comments'
    };

    return [trace1, trace2];
  }

  getSubDimData() {
    var trace1 = {
      x: ['Nov-17', 'Dec-17', 'Jan-18', 'Feb-18', 'Mar-18'],
      y: [200, 250, 230, 210, 180],
      fill: 'tozeroy',
      type: 'scatter',
      mode: 'none',
      name: 'Positive Comments'
    };

    var trace2 = {
      x: ['Nov-17', 'Dec-17', 'Jan-18', 'Feb-18', 'Mar-18'],
      y: [300, 320, 326, 290, 280],
      fill: 'tonexty',
      type: 'scatter',
      mode: 'none',
      name: 'Total Comments'
    };

    return [trace1, trace2];
  }

  getDimScoreData() {

    var trace1 = {
      x: ['Nov-17', 'Dec-17', 'Jan-18', 'Feb-18', 'Mar-18'],
      y: [200, 250, 230, 210, 180],
      fill: 'tozeroy',
      type: 'scatter',
      mode: 'none',
      name: 'Positive Comments'
    };

    var trace2 = {
      x: ['Nov-17', 'Dec-17', 'Jan-18', 'Feb-18', 'Mar-18'],
      y: [300, 320, 326, 290, 280],
      fill: 'tonexty',
      type: 'scatter',
      mode: 'none',
      name: 'Total Comments'
    };

    return [trace1, trace2];
  }

  getSubDimScoreData() {
    var trace1 = {
      x: ['Nov-17', 'Dec-17', 'Jan-18', 'Feb-18', 'Mar-18'],
      y: [200, 250, 230, 210, 180],
      fill: 'tozeroy',
      type: 'scatter',
      mode: 'none',
      name: 'Positive Comments'
    };

    var trace2 = {
      x: ['Nov-17', 'Dec-17', 'Jan-18', 'Feb-18', 'Mar-18'],
      y: [300, 320, 326, 290, 280],
      fill: 'tonexty',
      type: 'scatter',
      mode: 'none',
      name: 'Total Comments'
    };

    return [trace1, trace2];
  }

  plot(id, data, layout, options) {
    console.log(id);
    let elementExists = <CustomHTMLElement>document.getElementById(id);
    if(elementExists != null) {
      Plotly.newPlot(id, data, layout, options);
    }
  }

  optionChanged() {
    console.log(this.selected_category);
    this.plot('pie_1', this.getPieData(this.selected_category), this.plotlyPieLayout,this.plotlyOptions);
    this.plot('stacked_bar_1', this.getStackedBarData(this.selected_category), this.plotlyBarLayout,this.plotlyOptions);
  }
}
