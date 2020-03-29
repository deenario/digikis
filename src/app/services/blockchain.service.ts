import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private deviceId: string;
  private baseUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
    this.deviceId = localStorage.getItem('deviceId');
    this.authService.deviceIdSubject.subscribe(deviceId => {
      this.deviceId = deviceId;
    });
  }

  getDashboardData(type) {
    const parameters = new HttpParams().set('deviceid', this.deviceId);
    return this.http.get(`${this.baseUrl}/${type}`, { params: parameters });
  }
}
