import { Component, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ExpensesTableComponent } from '../expenses-table/expenses-table.component'
import { SubexpensesService } from '../services/subexpenses.service';
import { MonthSubexpensesResponse } from '../response/month-subexpenses'
import { SubexpensesData } from '../model/subexpenses-data'
import { TotalSubexpensesResponse } from '../response/total-subexpenses';
import { DateUtil } from '../util/date-util';
import { RouteUtil } from '../util/route-util';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  DateUtil = DateUtil;
  RouteUtil = RouteUtil;

  errorMessage!: string;
  currentCategory!: string;
  currentChatId!: string;
  totalExpensesResponse!: TotalSubexpensesResponse;
  monthsExpensesResponse: any[] = [];
  dataReady: boolean = false;
  win: Window = window;
  etc = new ExpensesTableComponent();

  constructor(private route: ActivatedRoute, private subexpensesService: SubexpensesService) {
    this.currentCategory = this.route.snapshot.paramMap.get('category') || "";
    this.currentCategory = this.currentCategory === 'summary' ? '%' : this.currentCategory
    this.currentChatId = this.route.snapshot.paramMap.get('chatId') || "";
  }

  ngOnInit(): void {
    const request = this.createRequest();

    this.initMonthsExpensesResponse(request);
    this.initTotalExpensesResponse(request);
  }

  private initMonthsExpensesResponse(request: any) {
    this.subexpensesService.findAllOverTimePeriodWithMonths(request).subscribe(
      (expenses: MonthSubexpensesResponse[]) => {
        this.monthsExpensesResponse = expenses;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  private initTotalExpensesResponse(request: any) {
    this.subexpensesService.findAllOverTimePeriod(request).subscribe(
      (expenses: TotalSubexpensesResponse) => {
        this.totalExpensesResponse = expenses;
        this.dataReady = true;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  private createRequest() {
    return {
      chatId: parseInt(this.currentChatId),
      category: this.currentCategory,
      timePeriod: RouteUtil.correctPeriodForRequest(this.route, 'period')
    };
  }
}
