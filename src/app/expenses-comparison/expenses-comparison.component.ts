import { Component, OnInit } from '@angular/core';
import { SubexpensesService } from '../services/subexpenses.service';
import { ActivatedRoute } from '@angular/router';

import { TotalMonthExpensesResponse } from '../response/total-months-expenses';
import { TimePeriod } from '../enums/time-period';
import { DateUtil } from '../util/date-util';
import { RouteUtil } from '../util/route-util';


@Component({
  selector: 'app-expenses-comparison',
  templateUrl: './expenses-comparison.component.html',
  styleUrls: ['./expenses-comparison.component.scss']
})
export class ExpensesComparisonComponent implements OnInit {
  allCatecoriesExpenses: any;
  TimePeriod = TimePeriod;
  DateUtil = DateUtil;
  RouteUtil = RouteUtil;

  chartReady: boolean = false;

  constructor(private route: ActivatedRoute, private subexpensesService: SubexpensesService) { }

  ngOnInit() {
    const request = this.initRequest();

    this.subexpensesService.findMonthsExpensesForAllCategories(request).subscribe((data: any) => {
      this.allCatecoriesExpenses = data;
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
