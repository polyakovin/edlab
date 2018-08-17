import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  features = [
    {
      title: 'Официальное трудоустройство',
      text: 'Накопление трудового стажа в школе или в учебном центре.',
      img: 'icons-teacher-01'
    },
    {
      title: 'Работа с опытными методистами',
      text: 'Среди наших методистов, эксперты ОГЭ и ЕГЭ, члены жюри многих олимпиад РФ и Франции.',
      img: 'icons-teacher-02'
    },
    {
      title: 'Инновационность',
      text: 'Наша система EdLabs поможет существенно сократить рутинные процессы и сосредоточиться на главном.',
      img: 'icons-teacher-03'
    },
    {
      title: 'Профессиональный рост',
      text: 'Наша программа рассчитана не только на подготовку к ЕГЭ, но и к уровневым и профильным олимпиадам.',
      img: 'icons-teacher-04'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
