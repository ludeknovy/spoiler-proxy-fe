import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EndpointsService } from '../endpoints.service';
import { Chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-connection-chart',
  templateUrl: './connection-chart.component.html',
  styleUrls: ['./connection-chart.component.css']
})
export class ConnectionChartComponent implements OnInit {

  connectionChart: Chart;
  subscription: Subscription;
  graphData;

  constructor(
    private endpointService: EndpointsService
  ) {
  }



  ngOnInit() {
    this.connectionChart = Highcharts.chart('container', {
      chart: {
        type: 'areaspline',
        height: 200,
      },
      title: {
        text: ''
      },
      yAxis: {
        gridLineColor: '#b7b7b717',
        title: {
          text: 'Connections'
        },
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.2
        }
      },
      xAxis: {
        categories: [],
      },
      legend: { enabled: false },
    });
    this.subscription = timer(0, 5000).pipe(
      switchMap(() => this.endpointService.getConnectionGraphGrouped())
    ).subscribe(result => {
      const statuses: any = Array.from(new Set([].concat.apply([], result.items.map(_ => _.grouped.map(__ => __.status)))));
      const data = result.items.map((_) => {
        return _.grouped.map(__ => ({ x: _.time, y: __.count, name: __.status }));
      });
      const flattenData: [any] = [].concat.apply([], data).sort((a, b) => a.x - b.x);

      const seriesData = statuses.map(_ => {
        return {
          data: flattenData.filter(__ => __.name === _).map(__ => __.y),
          name: _,
          type: 'areaspline',
          color: this.endpointService.getColorBasedOnStatus(_),
          marker: { enabled: false },
        };
      });


      if (this.connectionChart.series.length === 0) {
        seriesData.forEach(_ => this.connectionChart.addSeries(_));
      } else {
        seriesData.forEach((_, index) => {
          this.connectionChart.series[index].update(_, true);
        });
      }



      return result;
    });



    // fetch data every N seconds
    // subscribe to observable
    // update chart with new data

  }



}
