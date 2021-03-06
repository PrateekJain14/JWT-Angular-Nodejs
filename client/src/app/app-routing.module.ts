import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AuthGuard } from './auth.guard';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  { path: 'todos', component: TodoListComponent , canActivate: [AuthGuard]},
  { path: 'users', component: UserListComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
