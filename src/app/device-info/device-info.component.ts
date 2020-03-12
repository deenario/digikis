import { Component, OnInit } from '@angular/core';
import { HiWatchService } from '../services/hi-watch.service';
import { Error } from '../interfaces/error';
import { HelperService } from '../services/helper.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.css']
})

export class DeviceInfoComponent implements OnInit {
  deviceConfig;
  deviceStatus;
  error: Error = { status: false, message: '' };

  constructor(private hiWatchService: HiWatchService, private helperService: HelperService) { }

  ngOnInit() {
    this.helperService.deviceStatus.subscribe(deviceStatus => this.deviceStatus = deviceStatus);
    this.hiWatchService.getDeviceConfigInfo().subscribe(
      (data: any[]) => {
        if (data.length) {
          this.deviceConfig = data;
        } else {
          this.error = { status: true, message: 'No Device data found' };
        }
      }, (error) => {
        this.error = { status: true, message: error.message };
      });
  }
  updateDeviceStatus() {
    this.helperService.updateDeviceStatus();
  }
}
