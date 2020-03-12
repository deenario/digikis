import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public isLoading = new BehaviorSubject<boolean>(false);
  public deviceStatus = new BehaviorSubject<object>(JSON.parse(localStorage.getItem('deviceStatus')));
  private baseUrl = 'http://www.hi-watch.com.cn/hiwatchclient';

  constructor(private httpClient: HttpClient) { }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((item: FormGroup) => {
          this.validateAllFormFields(item);
        });
      }
    });
  }

  chageLoadStatus(loadStatus) {
    return this.isLoading.next(loadStatus);
  }

  updateDeviceStatus() {
    const deviceStatusText = {
      0: 'Online',
      1: 'Never made long connection to the server',
      2: 'Online',
      4: 'Disconnect to the server for a long time'
    };
    this.httpClient.get(`${this.baseUrl}/getWatchOnlineStatus.htm`, { params: { deviceId: localStorage.getItem('deviceId') } })
      .subscribe((data) => {
        const deviceStatus = { statusCode: data, message: deviceStatusText[data.toString()] };
        localStorage.setItem('deviceStatus', JSON.stringify(deviceStatus));
        this.deviceStatus.next(deviceStatus);
      });
  }
}
