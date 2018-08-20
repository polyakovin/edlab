import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRouterModule } from "./app.routing";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { LandingComponent } from './landing/landing.component';
import { AppComponent } from './app.component';
import { LoaderBigComponent } from './loaders/loader-big/loader-big.component';
import { LoaderInbtnComponent } from './loaders/loader-inbtn/loader-inbtn.component';
import { CommonService } from './common.service';
import { HttpService } from './http.service';
import { PupilComponent } from './pupil/pupil.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SignUpPupilComponent } from './auth/sign-up-pupil/sign-up-pupil.component';
import { SignUpTeacherComponent } from './auth/sign-up-teacher/sign-up-teacher.component';

mergeAllIconsToOneObject();

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PupilComponent,
    TeacherComponent,
    SignUpPupilComponent,
    SignUpTeacherComponent,
    LoaderBigComponent,
    LoaderInbtnComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouterModule,
    FontAwesomeModule
  ],
  providers: [ HttpService, CommonService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

function mergeAllIconsToOneObject() {
  let fa = {...fas, ...fab};
  for (const icon in fa) {
    fa[icon].prefix = 'fas';
  }
  library.add(fa);
}