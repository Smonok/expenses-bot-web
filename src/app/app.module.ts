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
import { SubexpensesService } from './services/subexpenses.service';
import { MonthSubexpensesResponse } from './response/month-subexpenses';
import { SubexpensesData } from './model/subexpenses-data';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DaysStatisticsComponent } from './statistics/days-statistics/days-statistics.component';
import { MonthsStatisticsComponent } from './statistics/months-statistics/months-statistics.component';
import { ExpensesComparisonComponent } from './expenses-comparison/expenses-comparison.component';
import { MultipleChartsComponent } from './expenses-comparison/multiple-charts/multiple-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SidenavListComponent,
    ExpensesComponent,
    ExpensesTableComponent,
    StatisticsComponent,
    DaysStatisticsComponent,
    MonthsStatisticsComponent,
    ExpensesComparisonComponent,
    MultipleChartsComponent
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
