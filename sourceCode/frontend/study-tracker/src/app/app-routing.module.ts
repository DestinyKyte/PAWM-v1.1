import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { SessionComponent } from './session/session.component';
import { CreatesessionComponent } from './createsession/createsession.component';
import { SinglesessionComponent } from './singlesession/singlesession.component';
import { TimerComponent } from './timer/timer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { LearntolearnComponent } from './learntolearn/learntolearn.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "letswork", component: SessionComponent},
  {path: "createsession", component: CreatesessionComponent},
  {path: "letswork/session/:id", component: SinglesessionComponent},
  {path: "letswork/session/:id/timer", component: TimerComponent},
  {path: "dashboard",  component: DashboardComponent},
  {path: "summary", component: SummaryComponent},
  {path: "learn", component: LearntolearnComponent},
  {path: "login", component: LoginPageComponent},
  {path: "register", component: RegisterComponent},
  {path: "**", component: WelcomeComponent},
  {path: "", component: HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
