import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { authGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'ticket',
    component: TicketListComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: ErrorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
