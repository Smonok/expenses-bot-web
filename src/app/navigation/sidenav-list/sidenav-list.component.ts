import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.chatId = user.chatId;

      console.log("token: ", user.token);

      this.userService.getCategoriesByChatId(user.chatId).subscribe(
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

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  public getChatId() {
    return this.chatId;
  }
}