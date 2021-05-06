import { Component, Input, OnInit } from '@angular/core';
import { EveryDayExpensesResponse } from '../../response/every-day-expenses';
import { chartColors } from '../shared/chart-colors';
import { chartOptions } from '../shared/chart-options';

@Component({
  selector: 'app-days-statistics',
  templateUrl: './days-statistics.component.html',
  styleUrls: ['./days-statistics.component.scss']
})
export class DaysStatisticsComponent implements OnInit {
  @Input() everyDayExpenses: EveryDayExpensesResponse[] = [];
  @Input() currentCategory: string = '';
  @Input() mainHeader: string = '';

  chartDatasets: any[] = [];
  chartLabels: any[] = [];
  totalSum: number = 0;

  constructor() {
  }

  ngOnInit() {
    this.initChartDatasets();
    this.initChartLabels();
    this.computeTotalSum();
  }

  private initChartDatasets() {
    this.chartDatasets = [{ data: this.everyDayExpenses.map((exp: { expenses: number; }) => exp.expenses), label: 'Ежедневные расходы' }];
  }

  private initChartLabels() {
    this.chartLabels = this.everyDayExpenses.map((su: { date: any; }) => su.date);
  }

  private computeTotalSum() {
    this.everyDayExpenses.forEach(exp => this.totalSum += exp.expenses);
  }

  public chartColors: Array<any> = [
    chartColors[Math.floor(Math.random() * chartColors.length)]
  ];

  public chartOptions: any = chartOptions;

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
