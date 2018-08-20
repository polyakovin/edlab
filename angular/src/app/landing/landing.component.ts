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
      const container = $('.content > .container');
      const h1 = container.find('h1');
      const p = container.find('p');
      const finalState = {opacity: 1, top: 0};
      const animationDuration = 600;

      h1.animate(finalState, animationDuration, () => {
        p.animate(finalState, animationDuration);
      });

      const setContainerSize = () => {
        const maxHeight = $(window).height();
        if (content.height() < maxHeight) {
          content.outerHeight(maxHeight);
        }
      }

      const content = $('.content');
      setContainerSize();
      $(window).resize(() => {
        setContainerSize();
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
