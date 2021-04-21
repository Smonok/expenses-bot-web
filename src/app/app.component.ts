import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  chatId!: number;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  isMenuOpen: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.chatId = user.chatId;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }

  public getChatId() {
    return this.chatId;
  }

  private substr(s: string, prefix: string, suffix: string) {
    let i = s.indexOf(prefix);
    if (i >= 0) {
      s = s.substring(i + prefix.length);
    }
    else {
      return '';
    }

    if (suffix) {
      i = s.indexOf(suffix);
      if (i >= 0) {
        s = s.substring(0, i);
      }
      else {
        return '';
      }
    }

    return s;
  };
}
