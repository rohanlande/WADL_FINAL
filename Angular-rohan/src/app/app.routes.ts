import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PorfileComponent } from './porfile/porfile.component';

export const routes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: PorfileComponent},
];
