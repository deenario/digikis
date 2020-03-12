import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HelperService } from '../services/helper.service';
import { HiWatchService } from '../services/hi-watch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather-fore-cast',
  templateUrl: './weather-fore-cast.component.html',
  styleUrls: ['./weather-fore-cast.component.css']
})
export class WeatherForeCastComponent implements OnInit {

  showResult: boolean;
  weatherForecastForm: FormGroup;
  weatherInfo;
  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private hiWatchService: HiWatchService,
    private toaster: ToastrService
  ) {
    this.showResult = false;
    this.weatherForecastForm = this.formBuilder.group({
      lbsinfo: ['', [Validators.required]],
      wifi: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      mt: ['0', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  submitWeatherInfo(event) {
    event.preventDefault();
    this.helperService.validateAllFormFields(this.weatherForecastForm);
    if (this.weatherForecastForm.invalid) {
      return;
    }
    this.hiWatchService.getWeatherInfo(this.weatherForecastForm.value).subscribe((data) => {
      this.weatherForecastForm.reset({ mt: 0 });
      if (data) {
        this.weatherInfo = data;
      } else {
        this.toaster.error('No data Found for you device.');
      }
    }, (error) => {
      this.toaster.error(error);
    }, () => {
      this.showResult = true;
    });
  }

}
