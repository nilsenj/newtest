import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { SignupComponent } from './signup/signup.component';
import { NavigaionComponent } from './navigaion/navigaion.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UberCoordinatorComponent } from './uber-coordinator/uber-coordinator.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { GeolocationService } from "./_services/geolocation.service";
import { CoordinatorService } from "./_services/coordinator.service";
import { UberProposalsService } from "./_services/uber-proposals.service";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavigaionComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    UberCoordinatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCtjsrywhqi_qFt9QQmIVNn-Ipxfgey_6c'
    }),
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    GeolocationService,
    CoordinatorService,
    UberProposalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
