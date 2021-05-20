import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CarparkComponent } from './carpark/carpark.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'carpark',component:CarparkComponent},
    {path: 'user',component:UserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
