import { Component, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ExpensesTableComponent } from '../expenses-table/expenses-table.component'
import { SubexpensesService } from '../services/subexpenses.service';
import { MonthSubexpensesResponse } from '../response/month-subexpenses'
import { SubexpensesData } from '../model/subexpenses-data'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {
  errorMessage!: string;
  currentCategory!: string;
  currentChatId!: string;
  monthsExpenses: any[] = [];
  etc = new ExpensesTableComponent();

  constructor(private route: ActivatedRoute, private subexpensesService: SubexpensesService) {
    this.currentCategory = this.route.snapshot.paramMap.get('category') || "";
    this.currentCategory = this.currentCategory === 'summary' ? '%' : this.currentCategory
    this.currentChatId = this.route.snapshot.paramMap.get('chatId') || "";

    const request = {
      chatId: parseInt(this.currentChatId),
      category: this.currentCategory,
      timePeriod: this.getTimePeriod()
    }

    this.subexpensesService.findAllOverTimePeriodWithMonths(request).subscribe(
      (expenses: MonthSubexpensesResponse[]) => {
        expenses.forEach(data => {
          this.monthsExpenses.push(data);
        });

      },
      (error: any) => this.errorMessage = <any>error
    );
  }

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

  private getTimePeriod() {
    const pathPeriod = this.route.snapshot.paramMap.get('period') || '';

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
