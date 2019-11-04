import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisteredGuard } from './registered.guard';
import { UnregisteredGuard } from './unregistered.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const appRoutes: Routes = [
  { path: '', children: [
    { path: 'login', component: LoginComponent, canActivate: [UnregisteredGuard] },
    { path: 'logout', component: LogoutComponent, canActivate: [RegisteredGuard] }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [RegisteredGuard, UnregisteredGuard]
})
export class AuthRoutingModule { }
