import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
// import ymaps from 'ymaps';

@Component({
  selector: 'app-pupil',
  templateUrl: './pupil.component.html',
  styleUrls: ['./pupil.component.scss']
})
export class PupilComponent implements OnInit {
  features = [
    {
      title: 'Качественно',
      text: 'Программа курсов составлена опытными методистами из МФТИ.',
      img: 'icons-01'
    },
    {
      title: 'Профессионально',
      text: 'Поможем определить стратегию роста. Этот план позволит, подготовиться к ОГЭ и ЕГЭ и поучаствовать в уровневых олимпиадах.',
      img: 'icons-02'
    },
    {
      title: 'Удобно',
      text: 'Все занятия будут проходить в образовательном центре Smartum.',
      img: 'icons-03'
    },
    // {
    //   title: 'Современно',
    //   text: 'Изучение предметов происходит при личном общении с преподавателем. Вся практика — он-лайн.',
    //   img: 'icons-04'
    // }
  ];





  leaders = [
    {
      "name": "Татьяна Сергеевна Бабичева",
      "status": "Ведущий методист по математике, кандидат физико-математических наук",
      "prouds": [
        "Стаж преподавания - 6 лет в физмат-лицее №5 г. Долгопрудный, 4 года в МФТИ",
        "Средний балл учеников по профильному ЕГЭ по математике – 90",
        "Среди учеников призеры финала Всероссийской, Всебританской и Всефранцузской олимпиад по математике"
      ]
    },
    {
      "name": "Никита Дмитриевич Бейлин",
      "status": "Ведущий методист по физике, магистр МФТИ по направлению прикладные математика и физика",
      "prouds": [
        "Стаж преподавания - 5 лет, в том числе в \"Физтех-лицей\" им. П.Л.Капицы и образовательном центре \"Сириус\"",
        "Средний балл учеников по профильному ЕГЭ по физике – 85",
        "Среди учеников участники финала Всероссийской олимпиады по физике, олимпиада имени Дж.К. Максвелла"
      ]
    }
  ]

  plans = [
    {
      "name": "5-9 классы",
      "variants": [
        {
          "title": "Приходи на бесплатный урок",
          "description": "Приходите к нам на бесплатное занятие. 5-9 классы, это самое идеальное время для того, чтобы привить интерес к точным наукам. Это залог успеха в будущем",
          "aos": "right"
        },
        {
          "title": "Занимайся в Edlabs",
          "description": "Наши курсы существенно расширят физико-математический кругозор и помогут развить навыки олимпиадного мышления.",
          "aos": "right"
        },
        {
          "title": "Участвуй в олимпиадах",
          "description": "Участие в олимпиадах формирует потенциал для для дальнейшего развития. Edlabs поможет в этом.",
          "aos": "right"
        },
        {
          "title": "Сдавай ОГЭ",
          "description": "Ключевым испытанием будет экзамен ОГЭ. Мы поможем эффективно подготовиться к нему.",
          "aos": "right"
        }
      ]
    },
    {
      "name": "10-11 классы",
      "variants": [
        {
          "title": "Приходи на бесплатный урок",
          "description": "Приходите к нам на бесплатное занятие. Узнаешь о нас и получишь стратегию поступления в вуз, которая подходит именно тебе.",
          "aos": "left"
        },
        {
          "title": "Занимайся в Edlabs",
          "description": "Получив стратегию поступления, вы будете знать какая программа подготовки подходит именно вам.",
          "aos": "left"
        },
        {
          "title": "Участвуй в олимпиадах",
          "description": "Для поступления в ВУЗ важно проявить себя на различных олимпиадах и конкурсах. Наши занятия помогут в этом.",
          "aos": "left"
        },
        {
          "title": "Сдавай ЕГЭ",
          "description": "Ключевым испытанием будет экзамен ЕГЭ. Мы поможем эффективно подготовиться к нему.",
          "aos": "left"
        }
      ]
    }
  ];

  features2 = [
    {
      "title": "Выгодно",
      "description": "Одна из самых низких цен<br>для курсов"
    },
    {
      "title": "Оптимально",
      "description": "Занятия 1–2 раза в неделю<br>по 2 ак.часа"
    },
    {
      "title": "Удобно",
      "description": "Рядом с домом в будни<br>и выходные дни"
    }
  ];

  socials = [
    // {
    //   "name": "instagram",
    //   "href": "#"
    // },
    {
      "name": "vk",
      "href": "https://vk.com/edlabs"
    },
    {
      "name": "facebook",
      "href": "https://www.facebook.com/groups/1521067934704120/"
    }
  ]

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    $(document).ready(() => {
      AOS.init({duration: 600, offset: 250});

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

      this.watchMediasHeights();

      // setTimeout(() => {
      //   console.log($('#navigation').find('.ymaps-2-1-65-svg-icon').width());
      // }, 3000);
    });
  }

  watchMediasHeights() {
    this.equilifyMediasHeights();
    $(document).resize(() => {
      this.equilifyMediasHeights();
    });
  }

  equilifyMediasHeights() {
    let maxHeight = 0;
    const medias = $('#plan .media');
    medias.each((i, media) => {
      if ($(media).height() > maxHeight) {
        maxHeight = $(media).height();
      }
    })
    medias.height(maxHeight);
  }

  goToLanding() {
    this.router.navigate(['/']);
  }

  showAddress() {
    $('.additional-info').animate({opacity: 1}, 600);
  }

  scrollTo(id) {
    const top = document.getElementById(id).offsetTop;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
}
