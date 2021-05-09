import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubexpensesService } from '../services/subexpenses.service';
import { EveryDayExpensesResponse } from '../response/every-day-expenses';
import { TotalMonthExpensesResponse } from '../response/total-months-expenses';
import { TimePeriod } from '../enums/time-period';
import { DateUtil } from '../util/date-util';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  TimePeriod = TimePeriod;
  DateUtil = DateUtil;

  chartReady: boolean = false;
  errorMessage!: string;
  currentCategory!: string;
  daysExpenses: EveryDayExpensesResponse[] = [];
  monthsExpenses: TotalMonthExpensesResponse[] = [];
  period!: TimePeriod;

  constructor(private route: ActivatedRoute, private subexpensesService: SubexpensesService) {
    this.currentCategory = this.parsedCurrentCategory();
    const pathPeriod = this.parsedRoute('period');
    this.period = this.currentState(pathPeriod);
    const request = this.initRequest(pathPeriod);

    this.initDaysExpenses(request);
    this.initMonthExpenses(request);
  }

  private parsedCurrentCategory(): string {
    const category = this.parsedRoute('category');
    return category === 'summary' ? '%' : category;
  }

  private currentState(pathPeriod: string): TimePeriod {
    const shortPeriods = ['seven-days', 'thirty-days'];

    if (shortPeriods.includes(pathPeriod)) {
      return TimePeriod.THIRTY_DAYS_OR_LESS
    }

    const longPeriods = ['half-year', 'one-year'];
    if (longPeriods.includes(pathPeriod)) {
      return TimePeriod.YEAR_OR_LESS
    }

    return TimePeriod.ALL_TIME;
  }

  private initRequest(currentPeriod: string) {
    return {
      chatId: parseInt(this.parsedRoute('chatId')),
      category: this.currentCategory,
      timePeriod: this.getTimePeriod(currentPeriod)
    }
  }

  private parsedRoute(pathParam: string): string {
    return this.route.snapshot.paramMap.get(pathParam) || '';
  }

  private initDaysExpenses(request: any) {
    if (this.period === TimePeriod.THIRTY_DAYS_OR_LESS) {
      this.subexpensesService.findEveryDayExpensesSum(request).subscribe(
        (dayExpenses: EveryDayExpensesResponse[]) => {
          this.daysExpenses = dayExpenses;
          this.chartReady = true;
        },
        (error: any) => this.errorMessage = <any>error
      );
    }
  }

  private initMonthExpenses(request: any) {
    if (this.period !== TimePeriod.THIRTY_DAYS_OR_LESS) {
      this.subexpensesService.findTotalMonthsExpenses(request).subscribe(
        (monthExpenses: TotalMonthExpensesResponse[]) => {
          this.monthsExpenses = monthExpenses;
          this.chartReady = true;
        },
        (error: any) => this.errorMessage = <any>error
      );
    }
  }

  private getTimePeriod(pathPeriod: string) {
    switch (pathPeriod) {
      case 'one-year':
        return '1 year';
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
