import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { NavComponent } from './nav/nav.component';
import { SessionComponent } from './session/session.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TimerComponent } from './timer/timer.component';
import { CreatesessionComponent } from './createsession/createsession.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { FormsModule } from '@angular/forms';
import { SinglesessionComponent } from './singlesession/singlesession.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select'
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { LearntolearnComponent } from './learntolearn/learntolearn.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    NavComponent,
    SidebarComponent,
    SessionComponent,
    TimerComponent,
    CreatesessionComponent,
    DashboardComponent,
    SummaryComponent,
    SinglesessionComponent,
    LearntolearnComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
