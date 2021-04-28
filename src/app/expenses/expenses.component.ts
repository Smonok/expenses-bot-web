import { Component, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ExpensesTableComponent } from '../expenses-table/expenses-table.component'
import { SubexpensesService, MonthSubexpensesData } from '../services/subexpenses.service';

export interface SubexpensesData {
  subexpenses: number;
  reasons: string;
  date: string;
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  errorMessage!: string;
  currentCategory!: string;
  currentChatId!: string;
  displayedColumns: string[] = ['subexpenses', 'reasons', 'date'];
  monthsExpenses: any[] = [];
  etc = new ExpensesTableComponent();

  constructor(private route: ActivatedRoute, private subexpensesService: SubexpensesService) {
    this.currentCategory = this.route.snapshot.paramMap.get('category') || "";
    this.currentChatId = this.route.snapshot.paramMap.get('chatId') || "";

    const request = {
      chatId: parseInt(this.currentChatId),
      category: this.currentCategory,
      timePeriod: this.getTimePeriod()
    }

    this.subexpensesService.findAllOverTimePeriodWithMonths(request).subscribe(
      (expenses: MonthSubexpensesData[]) => {
        expenses.forEach(data => {
          this.monthsExpenses.push(data);
        });

      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  ngOnInit(): void {

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
