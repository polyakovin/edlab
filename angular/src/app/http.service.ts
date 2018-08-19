import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

declare var markdown: any;

@Injectable()
export class HttpService {
  constructor(private http: Http) {}

  // получение данных
  get(url) {
    return this.http
      .get(url)
      .map((response: Response) => response.json());
  }

  // получение данных
  getMarkdown(url) {
    return this.http
      .get(url)
      .map((response: Response) => markdown.toHTML(response.text()));
  }

  // отправка данных
  post(data: any, url: string) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // отправка информации в файл на сервере
    return this.http
      .post(url, body, {headers: headers})
      .map((response: Response) => response.json());
  }
}