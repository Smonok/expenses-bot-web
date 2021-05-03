import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubexpensesService } from '../services/subexpenses.service';
import { MonthSubexpensesResponse } from '../response/month-subexpenses'
import { EveryDayExpensesResponse } from '../response/every-day-expenses';

export interface SubexpensesData {
  subexpenses: number;
  reasons: string;
  date: string;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  chartReady: boolean = false;
  errorMessage!: string;
  currentCategory!: string;
  currentChatId!: string;
  monthsExpenses: any[] = [];
  chartDatasets: any[] = [];
  chartLabels: any[] = [];
  everyDayExpenses: EveryDayExpensesResponse[] = [];
  categoryMonthsOrEarlier: boolean = false;
  totalSum: number = 0;
  public chartType: string = 'line';

  constructor(private route: ActivatedRoute, private subexpensesService: SubexpensesService) {
    this.currentCategory = this.route.snapshot.paramMap.get('category') || "";
    this.currentCategory = this.currentCategory === 'summary' ? '%' : this.currentCategory
    this.currentChatId = this.route.snapshot.paramMap.get('chatId') || "";
    const currentPeriod = this.route.snapshot.paramMap.get('period') || '';
    this.categoryMonthsOrEarlier = this.currentCategory !== '%' && ['seven-days', 'thirty-days'].includes(currentPeriod);

    const request = {
      chatId: parseInt(this.currentChatId),
      category: this.currentCategory,
      timePeriod: this.getTimePeriod(currentPeriod)
    }

    this.subexpensesService.findEveryDayExpensesSum(request).subscribe(
      (dayExpenses: EveryDayExpensesResponse[]) => {
        this.everyDayExpenses = dayExpenses;
        this.initChartDatasets();
        this.initChartLabels();
        this.computeTotalSum();
        this.chartReady = true;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  private initChartDatasets() {
    this.chartDatasets = [{ data: this.everyDayExpenses.map((exp: { expenses: number; }) => exp.expenses), label: 'Ежедневные расходы' }];
  }

  private initChartLabels() {
    this.chartLabels = this.everyDayExpenses.map((su: { date: any; }) => su.date);
  }

  private computeTotalSum() {
    this.everyDayExpenses.forEach(exp => this.totalSum = exp.expenses);
  }

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  formatedDateByMonthYear(monthYear: string): string {
    if (!monthYear.includes('.')) {
      return '';
    }

    var dotIndex = monthYear.lastIndexOf('.');
    const year = monthYear.substring(dotIndex + 1);
    const monthNumber = parseInt(monthYear.substr(0, dotIndex));
    const month = this.monthNameByNumber(monthNumber);

    return month + ', ' + year;
  }

  private monthNameByNumber(num: number): string {
    var monthNames = ['Январь', 'Февраль', 'Март',
      'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь',
      'Октябрь', 'Ноябрь', 'Декабрь'];

    return monthNames[num - 1];
  }

  private getTimePeriod(pathPeriod: string) {
    switch (pathPeriod) {
      case 'six-month':
        return '6 month';
      case 'thirty-days':
        return '30 days';
      case 'seven-days':
        return '7 days';
      default:
        return '100 year';
    }
  }
}
