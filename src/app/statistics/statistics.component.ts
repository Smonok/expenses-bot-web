import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubexpensesService } from '../services/subexpenses.service';
import { EveryDayExpensesResponse } from '../response/every-day-expenses';
import { TotalMonthExpensesResponse } from '../response/total-months-expenses';
import { PageState } from '../enums/page-state';
import { DateUtil } from '../util/date-util';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  PageState = PageState;
  DateUtil = DateUtil;

  chartReady: boolean = false;
  errorMessage!: string;
  currentCategory!: string;
  daysExpenses: EveryDayExpensesResponse[] = [];
  monthsExpenses: TotalMonthExpensesResponse[] = [];
  state!: PageState;

  constructor(private route: ActivatedRoute, private subexpensesService: SubexpensesService) {
    this.currentCategory = this.parseCurrentCategory();
    const currentPeriod = this.parseRoute('period');
    this.state = this.currentState(currentPeriod);
    const request = this.initRequest(currentPeriod);

    this.initDaysExpenses(request);
    this.initMonthExpenses(request);
  }

  private parseCurrentCategory(): string {
    const category = this.parseRoute('category');
    return category === 'summary' ? '%' : category;
  }

  private currentState(currentPeriod: string): PageState {
    const isSummary = this.currentCategory === '%';
    if (isSummary) {
      const periods = ['seven-days', 'thirty-days'];

      if (periods.includes(currentPeriod)) {
        return PageState.SUMMARY_30_DAYS_OR_LESS;
      }

      return PageState.SUMMARY_YEAR_OR_LESS;
    }

    const periods = ['seven-days', 'thirty-days'];
    if (periods.includes(currentPeriod)) {
      return PageState.CATEGORY_30_DAYS_OR_LESS
    }

    return PageState.CATEGORY_YEAR_OR_LESS;
  }

  private initRequest(currentPeriod: string) {
    return {
      chatId: parseInt(this.parseRoute('chatId')),
      category: this.currentCategory,
      timePeriod: this.getTimePeriod(currentPeriod)
    }
  }

  private parseRoute(pathParam: string): string {
    return this.route.snapshot.paramMap.get(pathParam) || '';
  }

  private initDaysExpenses(request: any) {
    if (this.state === PageState.CATEGORY_30_DAYS_OR_LESS) {
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
    if (this.state === PageState.CATEGORY_YEAR_OR_LESS) {
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
