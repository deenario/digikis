import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, components } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomHttpInterceptor } from './custom-http-interceptor';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoaderComponent } from './loader/loader.component';
import { HiWatchService } from './services/hi-watch.service';
import { ToastrModule } from 'ngx-toastr';
import { BlockchainService } from './services/blockchain.service';
@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    components,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    AuthService,
    HiWatchService,
    BlockchainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


