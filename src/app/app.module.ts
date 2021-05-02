import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatar';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from './material/material.module';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ExpensesComponent } from './expenses/expenses.component';
import { SubexpensesService, MonthSubexpensesData } from './services/subexpenses.service';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SidenavListComponent,
    ExpensesComponent,
    ExpensesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AvatarModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [authInterceptorProviders, SubexpensesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
