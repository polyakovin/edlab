import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
