import { Component, OnInit } from '@angular/core';
import { SubexpensesService } from '../services/subexpenses.service';
import { ActivatedRoute } from '@angular/router';

import { TimePeriod } from '../enums/time-period';
import { DateUtil } from '../util/date-util';
import { RouteUtil } from '../util/route-util';

@Component({
  selector: 'app-expenses-comparison',
  templateUrl: './expenses-comparison.component.html',
  styleUrls: ['./expenses-comparison.component.scss']
})
export class ExpensesComparisonComponent implements OnInit {
  allCategoriesExpenses: any;
  TimePeriod = TimePeriod;
  DateUtil = DateUtil;
  RouteUtil = RouteUtil;

  dataReady: boolean = false;

  constructor(private route: ActivatedRoute, private subexpensesService: SubexpensesService) { }

  ngOnInit() {
    this.initAllCategoriesExpenses();
  }

  private initAllCategoriesExpenses() {
    const request = this.initRequest();

    this.subexpensesService.findMonthsExpensesForAllCategories(request).subscribe((data: any) => {
      this.allCategoriesExpenses = data;
      this.dataReady = true;
    });
  }

  private initRequest() {
    return {
      chatId: parseInt(this.parsedRoute('chatId')),
      timePeriod: RouteUtil.correctPeriodForRequest(this.route, 'period')
    }
  }

  private parsedRoute(pathParam: string): string {
    return this.route.snapshot.paramMap.get(pathParam) || '';
  }
}
