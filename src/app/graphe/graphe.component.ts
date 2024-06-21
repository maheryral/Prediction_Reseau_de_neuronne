import { Component, ElementRef } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-graphe',
  templateUrl: './graphe.component.html',
  styleUrls: ['./graphe.component.scss']
})
export class GrapheComponent {
  constructor(private elementRef: ElementRef, private service:CommunicationService) { }
  dataxy:any=this.service.valuexy(0,0,500)
  ngOnInit() {
   
    this.createChart();
  }
  
  
  createChart() {
    

    const xValues =this.dataxy[0]
    const yValues =this.dataxy[1]

    const canvas = document.createElement('canvas');
    const container = this.elementRef.nativeElement.querySelector('#chart-container');
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      new Chart(ctx as ChartItem, {
        type: 'line',
        data: {
          labels: xValues,
          datasets: [{
            label: 'f(xn) = yn',
            data: yValues,
            tension: 0.4,
            backgroundColor: 'rgb(16,217,219)',
            pointBorderColor: 'transparent',
            borderColor: '#3e95cd',
            showLine: false
            
          }]
        },
        options: {
          // plugins: {
          //   legend: {
          //     display: false
          //   }
          // },
          responsive: true,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'xn'
              },
              min: -1.5,
              max: 1.5,
              ticks: {
                stepSize: 0.05
              },
              grid: {
                color: 'rgba(220, 220, 220, 0.05)' 
              }
            },
            y: {
              type: 'linear',
              title: {
                display: true,
                text: 'yn'
              },min: -0.5,
              max: 0.5,
              ticks: {
                stepSize: 0.05
              },
              grid: {
                color: 'rgba(220, 220, 220, 0.05)' 
              }
            }
          }
        }
      });
    }
  }
  // La fonction f(x) = y (ici f(x) = x^2 comme exemple)
  f(x: number): number {
    return x * x;
  }

}
