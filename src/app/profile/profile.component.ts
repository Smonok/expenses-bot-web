import { Component, OnInit } from '@angular/core';
import { CategoryButton } from '../response/category-button';
import { CategoryButtonService } from '../services/category-button.service';
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

  constructor(private token: TokenStorageService, private categoryButtonService: CategoryButtonService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.initCategoryExpenses();
    this.initSummaryExpenses();
  }

  initCategoryExpenses() {
    this.categoryButtonService.findAllByChatId(this.currentUser.chatId).subscribe(
      data => {
        this.categoriesExpenses = data;
      },
      err => {
        console.log(JSON.parse(err.error).message);
      }
    );
  }

  initSummaryExpenses() {
    this.categoryButtonService.computeSummaryExpenses(this.currentUser.chatId).subscribe(
      data => {
        this.summaryExpenses = data;
      },
      err => {
        console.log(JSON.parse(err.error).message);
      }
    );
  }

  logout(): void {
    this.token.signOut();
    window.location.reload();
  }
}