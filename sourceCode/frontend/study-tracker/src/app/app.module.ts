import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { NavComponent } from './nav/nav.component';
import { SessionComponent } from './session/session.component';
import { TimerComponent } from './timer/timer.component';
import { CreatesessionComponent } from './createsession/createsession.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { FormsModule } from '@angular/forms';
import { SinglesessionComponent } from './singlesession/singlesession.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LearntolearnComponent } from './learntolearn/learntolearn.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChartModule } from 'angular-highcharts';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { ErrorCatchingInterceptor } from './interceptors/http-error.interceptor';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    NavComponent,
    SessionComponent,
    TimerComponent,
    CreatesessionComponent,
    DashboardComponent,
    SummaryComponent,
    SinglesessionComponent,
    LearntolearnComponent,
    WelcomeComponent,
    RegisterComponent,
    HomeComponent,
    LoginPageComponent
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
    ChartModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true},
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: MatSnackBarModule, useClass: SessionComponent }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
