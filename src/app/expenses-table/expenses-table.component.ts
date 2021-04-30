import { Component, Input, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SubexpensesData } from '../model/subexpenses-data';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit, AfterViewInit {
  @Input() tableData: SubexpensesData[] = [];
  @Input() showCategory: boolean = false;
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<SubexpensesData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.displayedColumns = this.showCategory ? ['subexpenses', 'reasons', 'date', 'category'] : ['subexpenses', 'reasons', 'date'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setTableData() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
