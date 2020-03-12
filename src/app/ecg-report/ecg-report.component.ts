import { Component, OnInit } from '@angular/core';
import { Error } from '../interfaces/error';
import { HiWatchService } from '../services/hi-watch.service';

@Component({
  selector: 'app-ecg-report',
  templateUrl: './ecg-report.component.html',
  styleUrls: ['./ecg-report.component.css']
})
export class EcgReportComponent implements OnInit {
  error: Error = { status: false, message: '' };
  ecgReportData;

  constructor(private hiWatchService: HiWatchService) { }

  ngOnInit() {
    this.hiWatchService.getEcgReport().subscribe((data) => {
      this.ecgReportData = data;
      console.log(data);
    }, (error) => {
      this.error = { status: true, message: error.message };
    });
  }

}
