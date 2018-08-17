import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  features = [];
  renderedMarkdown = '';

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getFeatures();
    // this.getTestMarkdownPage();
  }

  goToPupil() {
    this.router.navigate(['pupil']);
  }

  goToTeacher() {
    this.router.navigate(['teacher']);
  }

  goToSchool() {
    alert('Страница для школы.');
    // this.router.navigate(['teacher']);
  }
}
