import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from '../../services/token-storage.service';
import { CategoryButtonService } from '../../services/category-button.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  chatId!: number;
  categories: string[] = [];
  isLoggedIn = false;
  user!: any;

  constructor(private tokenStorageService: TokenStorageService, private categoryButtonService: CategoryButtonService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.chatId = this.user.chatId;

      this.initCategories();
    }
  }

  private initCategories() {
    this.categoryButtonService.findCategoriesByChatId(this.user.chatId).subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(JSON.parse(err.error).message);
      }
    );
  }

  public onCategoryClick = (category: string, route: string, period: string) => {
    this.onSidenavClose();

    this.router.navigate(['user', this.chatId, category, route, period]).then(() => {
      window.location.reload();
    });
  }

  public onComparisonClick = (period: string) => {
    this.onSidenavClose();

    this.router.navigate(['user', this.chatId, 'comparison', period]).then(() => {
      window.location.reload();
    });
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  public getChatId() {
    return this.chatId;
  }
}