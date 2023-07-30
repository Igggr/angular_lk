import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { authGuard } from './guards/auth.guard';
import { ErrorComponent } from './components/error/error.component';
import { LOGIN_PATH, MAIN_PAGE_PATH, PROFILE_PATH, TICKET_PATH } from './const';

const routes: Routes = [
  {
    path: MAIN_PAGE_PATH,
    component: MainPageComponent,
    canActivate: [authGuard],
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
