import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import ymaps from 'ymaps';

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
      text: 'Изучение предметов происходит при личном общении с преподавателем. Вся практика — он-лайн.',
      img: 'icons-04'
    }
  ];

  leaders = [
    {
      "name": "Бабичева Татьяна Сергеевна",
      "status": "Ведущий методист (математика), кандидат физико-математических наук.",
      "prouds": [
        "Автор 4-х книг и множества методических пособий.",
        "Общий стаж преподавания 6 лет в физмат-лицее №5 г. Долгопрудный, 4 года в МФТИ.",
        "Средний балл по профильному ЕГЭ (математика) – 90.",
        "Среди учеников призеры финала всероссийской, всебританской и всефранцузской олимпиад по математике."
      ],
      "afterwords": "Кроме этого, Татьяна Сергеевна готовит абитуриентов в иностранные ВУЗы, среди них МТИ, Оксфорд, Кембридж, Карнеги"
    },
    {
      "name": "Бейлин Никита Дмитриевич",
      "status": "Ведущий методист (физика), магистр МФТИ по направлению прикладные математика и физика",
      "prouds": [
        "Общий стаж преподавания 5 лет (в том числе в физмат-лицее им. П.Л.Капицы)",
        "Член жюри регионального этапа Всероссийской олимпиады по физике, преподаватель ценра Сириус (г. Сочи)",
        "Средний балл по профильному ЕГЭ (физика) – 85",
        "Среди учеников участники финала всероссийской олимпиады по физике, олимпиада имени Дж.К. Максвелла"
      ]
    }
  ]

  plans = [
    {
      "name": "5-9 классы",
      "variants": [
        {
          "title": "Бесплатный урок",
          "description": "Приходите к нам на бесплатное занятие. 5-9 классы, это самое идеальное время для того, чтобы привить интерес к точным наукам. Это залог успеха в будущем",
          "aos": "right"
        },
        {
          "title": "Занятия в Edlabs",
          "description": "Наши курсы существенно расширят физико-математический кругозор и помогут развить навыки олимпиадного мышления.",
          "aos": "right"
        },
        {
          "title": "Участие в олимпиадах",
          "description": "Участие в олимпиадах формирует потенциал для для дальнейшего развития. Edlabs поможет в этом.",
          "aos": "right"
        },
        {
          "title": "ОГЭ",
          "description": "Ключевым испытанием будет экзамен ОГЭ. Мы поможем эффективно подготовиться к нему.",
          "aos": "right"
        }
      ]
    },
    {
      "name": "10-11 классы",
      "variants": [
        {
          "title": "Бесплатный урок",
          "description": "Приходите к нам на бесплатное занятие. Узнаешь о нас и получишь стратегию поступления в вуз, которая подходит именно тебе.",
          "aos": "left"
        },
        {
          "title": "Занятия в Edlabs",
          "description": "Получив стратегию поступления, вы будете знать какая программа подготовки подходит именно вам.",
          "aos": "left"
        },
        {
          "title": "Участие в олимпиадах",
          "description": "Для поступления в ВУЗ важно проявить себя на различных олимпиадах и конкурсах. Наши занятия помогут в этом.",
          "aos": "left"
        },
        {
          "title": "ЕГЭ",
          "description": "Ключевым испытанием будет экзамен ЕГЭ. Мы поможем эффективно подготовиться к нему.",
          "aos": "left"
        }
      ]
    }
  ];

  features2 = [
    {
      "title": "Выгодно",
      "description": "Одна из самых низких цен<br>для курсов такого уровня"
    },
    {
      "title": "Оптимально",
      "description": "Занятия 1 или 2 раза в неделю<br>по 2 ак.часа"
    },
    {
      "title": "Удобно",
      "description": "Рядом с домом в будни<br>и выходные дни"
    }
  ];

  socials = [
    {
      "name": "instagram",
      "href": "#"
    },
    {
      "name": "vk",
      "href": "https://vk.com/edlabs"
    },
    {
      "name": "facebook",
      "href": "#"
    }
  ]

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    $(document).ready(() => {
      ymaps.load().then(maps => {
        const map = new maps.Map('map', {
          center: [-8.369326, 115.166023]
        });
      })
      .catch(error => console.log('Failed to load Yandex Maps', error));

      AOS.init({duration: 600, offset: 250});
      // const container = $('.main-banner > .container');
      // const h1 = container.find('h1');
      // const p = container.find('p');
      // const btn = container.find('.btn');
      // const finalState = {opacity: 1, right: 0};
      // const finalStateFeature = {opacity: 1, top: 0};
      // const animationDuration = 600;

      // h1.animate(finalState, animationDuration, () => {
      //   p.animate(finalState, animationDuration, () => {
      //     btn.animate(finalState, animationDuration);
      //   });
      // });

      // function animateFeatures(now) {
      //   if (!isAnimated) {
      //     isAnimated = true;
      //     features.each((i, feature) => {
      //       setTimeout(() => {
      //         $(feature).animate(finalStateFeature, animationDuration);
      //       }, ((now ? 3 : 0) + i)*animationDuration);
      //     });
      //   }
      // }

      // const features = $('.content > .row > div');
      // let isAnimated = false;
      // if ($('.main-banner').height() < .7*$(window).height()) {
      //   animateFeatures(true);
      // } else {
      //   $(document).scroll(() => {
      //     animateFeatures(false)
      //   });
      // }

      const mapInfographics = $('.map-infographics');
      const mapInitialWidth = mapInfographics.width();
      const features = $("#features");

      setMapSize();
      $(window).resize(() => {
        setMapSize();
      });

      function setMapSize() {
        const standardWidth = features.width();
        if (standardWidth < mapInitialWidth) {
          const factor = standardWidth / mapInitialWidth;
          mapInfographics.css({transform: `scale(${factor})`});
          mapInfographics.width(standardWidth);
        }
      }
    });
  }

  goToLanding() {
    this.router.navigate(['/']);
  }

  showAddress() {
    $('.additional-info').animate({opacity: 1}, 600);
  }
}
