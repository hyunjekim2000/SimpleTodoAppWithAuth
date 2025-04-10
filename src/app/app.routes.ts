import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home' },
];
