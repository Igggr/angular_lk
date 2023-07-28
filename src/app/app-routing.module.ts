import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { authGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { LOGIN_PATH, MAIN_PAGE_PATH, PROFILE_PATH, TICKET_PATH } from './const';

const routes: Routes = [
  {
    path: MAIN_PAGE_PATH, component: MainPageComponent,
  },
  {
    path: LOGIN_PATH, component: LoginComponent,
  },
  {
    path: PROFILE_PATH,
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: TICKET_PATH,
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
