import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  currentCategory!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentCategory = this.route.snapshot.paramMap.get('category') || "";
  }



}
