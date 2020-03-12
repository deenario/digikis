import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private helperService: HelperService) { }

  public isLoggedInSubject = new BehaviorSubject<boolean>(this.checkIfLoggedIn());
  public deviceIdSubject = new BehaviorSubject<string>(localStorage.getItem('deviceId'));

  logIn(deviceId) {
    localStorage.setItem('deviceId', deviceId);
    this.deviceIdSubject.next(deviceId);
    this.isLoggedInSubject.next(true);
    this.helperService.updateDeviceStatus();
    this.router.navigate(['']);
  }

  logout() {
    localStorage.removeItem('deviceId');
    localStorage.removeItem('deviceStatus');
    this.isLoggedInSubject.next(false);
    this.deviceIdSubject.next('');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  checkIfLoggedIn() {
    if (localStorage.getItem('deviceId')) {
      return true;
    } else {
      return false;
    }
  }

}
