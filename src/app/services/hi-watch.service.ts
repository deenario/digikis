import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class HiWatchService {
  private deviceId: string;
  private baseUrl = 'http://www.hi-watch.com.cn/hiwatchclient';
  private params = new HttpParams();
  private headers = new HttpHeaders().append('Content-Type', 'text/html;charset=utf-8');

  constructor(private http: HttpClient, private authService: AuthService, private helperService: HelperService) {
    this.deviceId = localStorage.getItem('deviceId');
    this.params.delete('deviceId');
    this.params = this.params.set('deviceId', this.deviceId);
    this.authService.deviceIdSubject.subscribe(deviceId => {
      this.deviceId = deviceId;
      this.params = this.params.set('deviceId', this.deviceId);
    });
  }


  getDeviceConfigInfo() {
    let options = {
      params: this.params,
      headers: this.headers
    };
    options = Object.assign(options, { responseType: 'text' });
    return this.http.get<any>(`${this.baseUrl}/synconf.htm`, options).pipe(map((data) => {
      const formatedResponseArray = [];
      if (data !== 0) {
        const resArray = data.split('\n');
        const identifiers = {
          2: 'Emergency Numbers', 3: 'SOS Numbers', 4: 'Phone Book(Name&number)',
          8: 'Location Data', 9: 'Reminders(Medicen & Water etc)', 10: 'sedentary On/Off',
          11: 'Falldown alarm', 13: 'Heart rate data', 14: 'Upload interval time and silence time',
          15: 'Mean interval time', 17: 'Low  voltage  range,high  voltage range，bp automatically test interval，silence time',
          18: 'B/O automatically  test  interval，silence time', 22: 'Passometer ,on/off',
          23: 'Sleep,on /off', 24: 'phone  sim  card  number',
          25: 'Mobile  arrears  QR-code linkneed  device  send iccid，and must  be  the  operator  provide card）',
          26: 'Hands shake threshold（check the elder man for dementia）'
        };
        resArray.forEach(resString => {
          if (resString) {
            const splitedString = resString.split(':');
            const identifierValue = identifiers[splitedString[0]] ? identifiers[splitedString[0]] : splitedString[0];
            formatedResponseArray.push({ identifier: identifierValue, value: splitedString[1] });
          }
        });
      }
      return formatedResponseArray;
    }));
  }

  getEcgReport() {
    return this.http.get(`${this.baseUrl}/getecgreport.htm`, { params: this.params });
  }

  getEcgWaveForm() {
    let options = {
      headers: this.headers
    };
    options = Object.assign(options, { responseType: 'text' });
    return this.http.post(`${this.baseUrl}/getecgimage.htm`, this.params, options);
  }

  getBpReport() {
    let options = {
      params: this.params,
      headers: this.headers
    };
    options = Object.assign(options, { responseType: 'text' });
    return this.http.get(`${this.baseUrl}/breportmessage.htm`, options).pipe(map((response) => {
      const dom = new DOMParser().parseFromString(response.toString(), 'text/html');
      return dom.getElementById('cen').innerHTML.trim();
    }));
  }

  getWeatherInfo(weatherInfoPayload) {
    let payload = this.params;
    Object.keys(weatherInfoPayload).forEach((key) => {
      payload = payload.append(key, weatherInfoPayload[key]);
    });
    console.log(payload);
    let options = {
      params: payload,
      headers: this.headers
    };
    options = Object.assign(options, { responseType: 'text' });
    return this.http.get(`${this.baseUrl}/getWeatherInform.htm`, options);
  }

  setupElectronicFence(formData) {
    let payLoad = this.params;
    payLoad = payLoad.append('array', formData);
    return this.http.post(`${this.baseUrl}/updatepoint.htm`, JSON.stringify(payLoad), { headers: this.headers });
  }
}

