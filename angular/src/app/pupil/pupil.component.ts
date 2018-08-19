import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-pupil',
  templateUrl: './pupil.component.html',
  styleUrls: ['./pupil.component.scss']
})
export class PupilComponent implements OnInit {
  features = [
    {
      title: 'Качественно',
      text: 'Все материалы наших курсов разработаны ведущими специалистами из МГУ, МФТИ, ВШЭ, МГТУ.',
      img: 'icons-01'
    },
    {
      title: 'Профессионально',
      text: 'Помимо подготовки к экзамену, наши преподаватели помогут определить стратегию и подготовят к соответствующим олимпиадам.',
      img: 'icons-02'
    },
    {
      title: 'Удобно',
      text: 'Все занятия проходят в одной из ближайших к твоему дому школ.',
      img: 'icons-03'
    },
    {
      title: 'Современно',
      text: 'Изучение предметов происходит при личном общении с преподавателем. Вся практика — он-лайн на платформе EdLabs.',
      img: 'icons-04'
    }
  ]

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    $(document).ready(() => {
      const container = $('.main-banner > .container');
      const h1 = container.find('h1');
      const p = container.find('p');
      const btn = container.find('.btn');
      const finalState = {opacity: 1, right: 0};
      const finalStateFeature = {opacity: 1, top: 0};
      const animationDuration = 600;

      h1.animate(finalState, animationDuration, () => {
        p.animate(finalState, animationDuration, () => {
          btn.animate(finalState, animationDuration);
        });
      });

      function animateFeatures(now) {
        if (!isAnimated) {
          isAnimated = true;
          features.each((i, feature) => {
            setTimeout(() => {
              $(feature).animate(finalStateFeature, animationDuration);
            }, ((now ? 3 : 0) + i)*animationDuration);
          });
        }
      }

      const features = $('.content > .row > div');
      let isAnimated = false;
      if ($('.main-banner').height() < .7*$(window).height()) {
        animateFeatures(true);
      } else {
        $(document).scroll(() => {
          animateFeatures(false)
        });
      }
    });
  }

  goToLanding() {
    this.router.navigate(['/']);
  }
}
