import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

@Injectable()
export class UnregisteredGuard implements CanActivate {
  constructor(private as: AuthService) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.as.getRole().map((role: string) => role === "");
  }
}
