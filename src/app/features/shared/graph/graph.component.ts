import { Component, computed, effect, Input, OnInit, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { IItem } from '../../../core/interfaces/interface-item';
import { ItemStore } from '../../../core/item.store';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

interface IChartType {
  name: string;
  type: string;
}

interface IChartDataType {
  name: string;
  type: string;
}

@Component({
  selector: 'app-graph',
  imports: [ChartModule, SelectModule, FormsModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit {

  @Input() items!: IItem[];

  showChart: boolean = false;
  chartData: any;
  chartType: IChartType = { name: '', type: '' };
  chartDataType: IChartDataType = { name: '', type: '' };

  chartTypes: IChartType[] = []
  chartDataTypes: IChartDataType[] = []

  constructor(private itemStore: ItemStore) {
    effect(() => {
      const items = this.itemStore.items();
      this.updateBarChartData(items, 'sold');
    });
  }

  chartOptions: any;

  ngOnInit(): void {
    this.chartType = { name: 'Bar', type: 'bar' };
    this.chartDataType = { name: 'Sold', type: 'sold' };

    this.chartTypes = [
      { type: 'bar', name: 'Bar' },
      { type: 'pie', name: 'Pie Chart' },
    ]

    this.chartDataTypes = [
      { type: 'stock', name: 'Stock' },
      { type: 'sold', name: 'Sold' }
    ]
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          enabled: true
        }
      }
    };

  }

  changeGraphType() {
    if (this.chartType.type === 'bar') {
      this.updateBarChartData(this.itemStore.items(), this.chartDataType.type);
    } else if (this.chartType.type === 'pie') {
      this.updatePieChartData(this.itemStore.items(), this.chartDataType.type);
    }

  }

  updateBarChartData(items: IItem[], key: string): void {
    console.log(items.length)
    if (items.length > 0) {
      if (key === 'stock') {
        this.chartData = {
          labels: items.map(item => item.itemName),
          datasets: [
            {
              label: 'Stock',
              data: items.map(item => item.stock),
              backgroundColor: 'green',
              borderWidth: 1
            }
          ]
        };
      } else {
        this.chartData = {
          labels: items.map(item => item.itemName),
          datasets: [
            {
              label: 'Sold',
              data: items.map(item => item.sold),
              backgroundColor: 'red',
              borderWidth: 1
            }
          ]
        };
      }
      this.showChart = true
    } else {
      this.showChart = false
    }

  }

  updatePieChartData(items: IItem[], key: string): void {
    if (items.length > 0) {
      if (key === 'stock') {
        this.chartData = {
          labels: items.map(item => item.itemName),
          datasets: [
            {
              data: items.map(item => item.stock),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF6384',
                '#36A2EB'
              ],
              hoverOffset: 4
            }
          ]
        };
      } else {
        this.chartData = {
          labels: items.map(item => item.itemName),
          datasets: [
            {
              data: items.map(item => item.sold),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF6384',
                '#36A2EB'
              ],
              hoverOffset: 4
            }
          ]
        };
      }

      this.showChart = true
    }

  }
}
