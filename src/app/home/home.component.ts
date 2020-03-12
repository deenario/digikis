import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../services/blockchain.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  sportData: any;
  sleepData: any;
  requestCompleted = { sportData: false, sleepData: false };
  constructor(private blockhaninService: BlockchainService, private toaster: ToastrService) {
  }

  ngOnInit() {
    this.blockhaninService.getDashboardData('sportdata').subscribe((data: any) => {
      this.sportData = data;
      this.requestCompleted.sportData = true;
    }, (error) => {
      this.requestCompleted.sportData = true;
      this.toaster.error(error.message);
    });

    this.blockhaninService.getDashboardData('sleepdata').subscribe((data: any) => {
      this.requestCompleted.sleepData = true;
      this.sleepData = data;
    }, (error) => {
      this.toaster.error(error.message);
      this.requestCompleted.sleepData = true;
    });
  }

}
