import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';

import { TokenStorageService } from '../../services/token-storage.service';
import { UserService } from '../../services/user.service';

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

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.chatId = this.user.chatId;

      console.log("token: ", this.user.token);

      this.userService.getCategoriesByChatId(this.user.chatId).subscribe(
        data => {
          this.categories = data;
        },
        err => {
          console.log(JSON.parse(err.error).message);
        }
      );

      console.log("categories: ", this.categories);
    }
  }

  public onCategoryClick = (category: string, period: string) => {
    this.onSidenavClose();

    this.router.navigate(['user', this.chatId, category, 'expenses', period]).then(() => {
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