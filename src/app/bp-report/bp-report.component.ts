import { Component, OnInit } from '@angular/core';
import { HiWatchService } from '../services/hi-watch.service';
import { Error } from '../interfaces/error';

@Component({
  selector: 'app-bp-report',
  templateUrl: './bp-report.component.html',
  styleUrls: ['./bp-report.component.css']
})
export class BpReportComponent implements OnInit {
  error: Error = { status: false, message: '' };
  bpReportData;
  constructor(private hiWatchService: HiWatchService) { }

  ngOnInit() {
    this.hiWatchService.getBpReport().subscribe((data) => {
      this.bpReportData = data;
    }, (error) => {
      this.error = { status: true, message: error.message };
    });
  }

}
