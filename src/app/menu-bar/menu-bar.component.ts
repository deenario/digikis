import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  displayMenyBar = false;
  ngOnInit() {
  }

  logOut(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  toggleMenuDisplay() {
    this.displayMenyBar = !this.displayMenyBar;
  }
}
