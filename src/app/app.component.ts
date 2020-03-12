import { Component, OnInit, OnDestroy } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  isLoading: boolean;
  authSub: Subscription;


  constructor(protected authService: AuthService) {
    setTheme('bs4');
  }

  ngOnInit() {
    this.authSub = this.authService.isLoggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
