import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { StatisticsComponent } from './statistics/statistics.component'
import { ExpensesComparisonComponent } from './expenses-comparison/expenses-comparison.component'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:chatId/profile', component: ProfileComponent },
  { path: 'user/:chatId/:category/expenses/:period', component: ExpensesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/:chatId/:category/statistics/:period', component: StatisticsComponent },
  { path: 'user/:chatId/comparison/:period', component: ExpensesComparisonComponent },
  { path: '', redirectTo: 'about', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
