import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'ng-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private common: CommonService
  ) { }

  ngOnInit() {
    this.common.commonAlert = $('.commonAlert');
    this.common.commonConfirm = $('.commonConfirm');
  }

}
