import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HelperService } from '../services/helper.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`

    `]
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private authService: AuthService,
    public router: Router) {
  }

  loginForm = this.fb.group({
    deviceId: ['', [Validators.required]]
  });

  ngOnInit() {
    if (this.authService.checkIfLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.helperService.validateAllFormFields(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.logIn(this.loginForm.controls[`deviceId`].value);
  }

}
