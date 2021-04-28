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

  ngOnInit() {
    // this.etc.setTableData(this.monthsExpenses[0].subexpensesDto);
    // console.log(this.monthsExpenses)

    // const request = {
    //   chatId: parseInt(this.currentChatId),
    //   category: this.currentCategory,
    //   timePeriod: this.getTimePeriod()
    // }

    // this.subexpensesService.findAllOverTimePeriodWithMonths(request).subscribe(
    //   (expenses: MonthSubexpensesData[]) => {
    //     expenses.forEach(data => {
    //       const tmp = {
    //         exp: data,
    //         datasource: new MatTableDataSource(data.subexpensesDto)
    //       }

    //       this.monthsExpenses.push(tmp);
    //     });

    //   },
    //   (error: any) => this.errorMessage = <any>error
    // );

  }

  // ngAfterViewInit() {
  //   this.monthsExpenses.forEach(exp => {
  //     setTimeout(() => exp.datasource.paginator = this.paginator);
  //     setTimeout(() => exp.datasource.sort = this.paginator);
  //   });

  //   console.log("this.paginator: ", this.paginator);

  //   // this.dataSource.paginator = this.paginator;
  //   // this.dataSource.sort = this.sort;
  // }

  initTable() {
    // const request = {
    //   chatId: parseInt(this.currentChatId),
    //   category: this.currentCategory,
    //   timePeriod: this.getTimePeriod()
    // }

    // this.subexpensesService.findAllOverTimePeriodWithMonths(request).subscribe(
    //   (expenses: MonthSubexpensesData[]) => {
    //     this.monthsExpenses = expenses;
    //     //this.dataSource = new MatTableDataSource(expenses);
    //     //this.dataSource.paginator = this.paginator;
    //     //this.dataSource.sort = this.sort;
    //     // Any code to be run after the subscription is complete goes here
    //   },
    //   (error: any) => this.errorMessage = <any>error
    // );
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
