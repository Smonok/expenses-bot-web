import { Component, OnInit } from '@angular/core';
import { SubexpensesService } from '../services/subexpenses.service';
import { ActivatedRoute } from '@angular/router';

import { TotalMonthExpensesResponse } from '../response/total-months-expenses';
import { TimePeriod } from '../enums/time-period';
import { DateUtil } from '../util/date-util';


@Component({
  selector: 'app-expenses-comparison',
  templateUrl: './expenses-comparison.component.html',
  styleUrls: ['./expenses-comparison.component.scss']
})
export class ExpensesComparisonComponent implements OnInit {
  allCatecoriesExpenses: any;
  TimePeriod = TimePeriod;
  DateUtil = DateUtil;

  chartReady: boolean = false;

  constructor(private route: ActivatedRoute, private subexpensesService: SubexpensesService) { }

  ngOnInit() {
    const pathPeriod = this.parsedRoute('period');
    const request = this.initRequest(pathPeriod);

    this.subexpensesService.findMonthsExpensesForAllCategories(request).subscribe((data: any) => {
      this.allCatecoriesExpenses = data;
      console.log("allCatecoriesExpenses: ", this.allCatecoriesExpenses);
    });
  }

  private initRequest(currentPeriod: string) {
    return {
      chatId: parseInt(this.parsedRoute('chatId')),
      timePeriod: this.getTimePeriod(currentPeriod)
    }
  }

  private parsedRoute(pathParam: string): string {
    return this.route.snapshot.paramMap.get(pathParam) || '';
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
