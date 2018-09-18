import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { CommonService } from './common.service';

@Component({
  selector: 'ng-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private http: HttpService,
    public common: CommonService
  ) { }

  ngOnInit() {
    this.common.commonAlert = $('#commonAlert');
    this.common.commonConfirm = $('#commonConfirm');
    this.countVisitors();
  }

  countVisitors() {
    this.http.get('https://ipapi.co/json/').subscribe(
      data => {
        this.http.post({ip: data.ip}, 'visits/add-visitor').subscribe()
      }
    );
  }
}
