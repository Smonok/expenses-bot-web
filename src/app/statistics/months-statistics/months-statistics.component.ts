import { Component, Input, OnInit } from '@angular/core';
import { TotalMonthExpensesResponse } from 'src/app/response/total-months-expenses';
import { DateUtil } from 'src/app/util/date-util';
import { chartColors } from '../shared/chart-colors';
import { chartOptions } from '../shared/chart-options';

@Component({
  selector: 'app-months-statistics',
  templateUrl: './months-statistics.component.html',
  styleUrls: ['./months-statistics.component.scss']
})
export class MonthsStatisticsComponent implements OnInit {
  @Input() monthsExpenses: TotalMonthExpensesResponse[] = [];
  @Input() currentCategory: string = '';

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
    this.chartDatasets = [{ data: this.monthsExpenses.map((exp: { expenses: number; }) => exp.expenses), label: 'Ежемесячные расходы' }];
  }

  private initChartLabels() {
    this.chartLabels = this.monthsExpenses.map((su: { monthYear: any; }) => DateUtil.formatedDateByMonthYear(su.monthYear));
  }

  private computeTotalSum() {
    this.monthsExpenses.forEach(exp => this.totalSum += exp.expenses);
  }

  public chartColors: Array<any> = [
    chartColors[Math.floor(Math.random() * chartColors.length)]
  ];

  public chartOptions: any = chartOptions;

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
