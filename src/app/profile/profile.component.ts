import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CategoryButton } from '../response/category-button';
import { CategoryButtonService } from '../services/category-button.service';
import { SubexpensesService } from '../services/subexpenses.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  categoriesExpenses: CategoryButton[] = [];
  summaryExpenses: number = 0;
  currentTab: string = 'categories';
  highestExpensesCategory!: any;
  lowestExpensesCategory!: any;
  isDataReady: boolean = false;
  maxSubexpenses!: any;
  mostCommonlyUsed!: any;

  constructor(private token: TokenStorageService, private subexpensesService: SubexpensesService, private categoryButtonService: CategoryButtonService, private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { this.onTabChange(); }
    });
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.initCategoriesExpenses();
    this.initSummaryExpenses();
    this.initMaxSubexpenses();
    this.initMostCommonlyUsed();
    this.isDataReady = true;
  }

  onTabChange() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.currentTab = urlParams.get('tab') || 'categories';
  }

  private initCategoriesExpenses() {
    this.categoryButtonService.findAllByChatId(this.currentUser.chatId).subscribe(
      data => {
        this.categoriesExpenses = data;

        this.findHighestExpensesCategory(data);
        this.findLowestExpensesCategory(data);
      },
      err => {
        console.log(JSON.parse(err.error).message);
      }
    );
  }

  private initSummaryExpenses() {
    this.categoryButtonService.computeSummaryExpenses(this.currentUser.chatId).subscribe(
      data => {
        this.summaryExpenses = data;
      },
      err => {
        console.log(JSON.parse(err.error).message);
      }
    );
  }

  private initMaxSubexpenses() {
    this.subexpensesService.findMaxByChatId(this.currentUser.chatId).subscribe(
      data => {
        this.maxSubexpenses = data;
      },
      err => {
        console.log(JSON.parse(err.error).message);
      }
    );
  }

  private initMostCommonlyUsed() {
    this.subexpensesService.countEntitiesNumber(this.currentUser.chatId).subscribe(
      data => {
        this.mostCommonlyUsed = data;
      },
      err => {
        console.log(JSON.parse(err.error).message);
      }
    );
  }

  findHighestExpensesCategory(categoriesExpenses: any[]) {
    this.highestExpensesCategory = categoriesExpenses.reduce((p, c) => p.expenses > c.expenses ? p : c);
  }

  findLowestExpensesCategory(categoriesExpenses: any[]) {
    this.lowestExpensesCategory = categoriesExpenses.reduce((p, c) => p.expenses < c.expenses ? p : c);
  }

  logout(): void {
    this.token.signOut();
    window.location.reload();
  }
}