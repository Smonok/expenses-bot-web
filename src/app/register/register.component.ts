import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {
    name: 'User#',
    email: '',
    chatId: 0,
    password: ''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {    
  }

  onSubmit(): void {
    const { name, email, chatId, password } = this.form;

    this.authService.register(name, email, chatId, password).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        this.showSuccess();
        this.router.navigate(['login']);
      },
      err => {
        console.log("err: ", err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  showSuccess() {
    this.toastr.success('Войдите в аккаунт', 'Регистрация успешна!');
  }
}
