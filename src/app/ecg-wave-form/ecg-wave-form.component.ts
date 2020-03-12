import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { HiWatchService } from '../services/hi-watch.service';

@Component({
  selector: 'app-ecg-wave-form',
  templateUrl: './ecg-wave-form.component.html',
  styleUrls: ['./ecg-wave-form.component.css']
})
export class EcgWaveFormComponent implements OnInit {

  ecgImg: any;
  requestCompleted: boolean;
  constructor(
    private toastr: ToastrService,
    private hiWatchService: HiWatchService
  ) {
  }

  ngOnInit() {
    this.requestCompleted = false;
    this.hiWatchService.getEcgWaveForm().subscribe((data) => {
      if (Number(data)) {
        this.toastr.error('Ecg Wave form for your device couldn\'t be found');
      } else {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          this.ecgImg = fileReader.result;
        };
      }
    }, (error) => {
      this.toastr.error(error);
    }, () => {
      this.requestCompleted = true;
    });
  }

}
