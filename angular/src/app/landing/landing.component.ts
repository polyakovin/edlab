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
    private router: Router
  ) { }

  ngOnInit() {
    // this.getFeatures();
    // this.getTestMarkdownPage();

    $(document).ready(() => {
      const content = $('.content');
      $(window).resize(() => {
        const maxHeight = $(window).height() - 40 - 62;
        if (content.height() < maxHeight) {
          content.height(maxHeight);
        }
      });
    });
  }

  goToLanding() {
    this.router.navigate(['/']);
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
