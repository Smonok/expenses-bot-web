import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  chatId!: number;
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService) { }



  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.chatId = user.chatId;
    }
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  
  public getChatId() {
    return this.chatId;
  }
}