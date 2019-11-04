import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanLoad {
  constructor(private as: AuthService) { }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.as.getRole().map((role: string) => role === "a");
  }
}
