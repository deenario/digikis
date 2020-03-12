import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  tap, finalize, catchError
} from 'rxjs/operators';
import { HelperService } from './services/helper.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private helperService: HelperService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.helperService.chageLoadStatus(true);
    return next.handle(req).pipe(finalize(() => {
      this.helperService.chageLoadStatus(false);
    }));
  }
}
