import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    {path:"", component:LoginComponent},
    {path:"tasks", component:TasksComponent},
    {path:"signup", component:SignupComponent},
];
