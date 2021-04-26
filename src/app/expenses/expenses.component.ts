import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SubexpensesService, ExpensesOverTimePeriodRequest } from '../services/subexpenses.service';

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
export class ExpensesComponent implements AfterViewInit {
  currentCategory!: string;
  currentChatId!: string;
  subexpensesData!: SubexpensesData[];
  displayedColumns: string[] = ['subexpenses', 'reasons', 'date'];
  dataSource!: MatTableDataSource<SubexpensesData>;
  totalExpenses: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private subexpensesService: SubexpensesService) { }

  ngAfterViewInit() {
    this.currentCategory = this.route.snapshot.paramMap.get('category') || "";
    this.currentChatId = this.route.snapshot.paramMap.get('chatId') || "";
    this.initTable();
    this.computeTotalExpensesOverTimePeriod();
  }

  initTable() {
    const request = {
      chatId: parseInt(this.currentChatId),
      category: this.currentCategory,
      timePeriod: this.getTimePeriod()
    }

    this.subexpensesService.findAllByChatIdAndCategory(request).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.error(JSON.parse(err.error).message);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  computeTotalExpensesOverTimePeriod() {
    const timePeriod = this.getTimePeriod();
    const request = {
      chatId: parseInt(this.currentChatId),
      category: this.currentCategory,
      timePeriod: timePeriod
    }

    this.subexpensesService.computeTotalExpensesOverTimePeriod(request).subscribe(
      data => {
        this.totalExpenses = data;
      },
      err => {
        console.error("Cannot compute total expenses: ", err);
      }
    );
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
