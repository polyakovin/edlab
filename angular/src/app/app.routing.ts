import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { PupilComponent } from "./pupil/pupil.component";
import { TeacherComponent } from "./teacher/teacher.component";

const APP_ROUTES: Routes = [
  { path: '', component: PupilComponent },
  // { path: 'pupil', component: PupilComponent },
  // { path: 'teacher', component: TeacherComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRouterModule {}