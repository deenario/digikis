import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { BpReportComponent } from './bp-report/bp-report.component';
import { EcgReportComponent } from './ecg-report/ecg-report.component';
import { ElectronicFenceComponent } from './electronic-fence/electronic-fence.component';
import { EcgWaveFormComponent } from './ecg-wave-form/ecg-wave-form.component';
import { WeatherForeCastComponent } from './weather-fore-cast/weather-fore-cast.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'report/bp', component: BpReportComponent, canActivate: [AuthGuard] },
  { path: 'report/ecg', component: EcgReportComponent, canActivate: [AuthGuard] },
  { path: 'device', component: DeviceInfoComponent, canActivate: [AuthGuard] },
  { path: 'weather/forecast', component: WeatherForeCastComponent, canActivate: [AuthGuard] },
  { path: 'ecg/waveform', component: EcgWaveFormComponent, canActivate: [AuthGuard] },
  { path: 'electronic/fence', component: ElectronicFenceComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const components = [LoginComponent, HomeComponent, DeviceInfoComponent, BpReportComponent,
  EcgReportComponent, ElectronicFenceComponent, EcgWaveFormComponent, WeatherForeCastComponent];
