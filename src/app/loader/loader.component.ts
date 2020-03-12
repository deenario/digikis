import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-loader',
  template: `
    <div class='overlay' [style.display]= "isLoading ? 'block' : 'none'">
        <div class='spinner'>
          <img src="{{loadingImagePath}}"/>
        </div>
    </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  helperSub = new Subscription();
  loadingImagePath = environment.baseUrl + '/assets/loading.gif';
  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.helperSub = this.helperService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    this.helperSub.unsubscribe();
  }

}
