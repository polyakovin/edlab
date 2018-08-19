import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../common.service';
import { HttpService } from '../../http.service';

@Component({
  selector: 'na-sign-up',
  templateUrl: './sign-up.component.html',
  styles: [`
    .form-group {
      margin-bottom: 10px;
    }

    .ng-invalid.ng-pristine + .input-tip, .ng-valid + .input-tip {
      display: none;
    }
  `]
})
export class SignUpComponent {
  form: FormGroup;
  loading = false;

  constructor(public common: CommonService,
              private http: HttpService,
              private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      'firstName': ['', [
        Validators.required,
        Validators.pattern('.{2,20}')
      ]],
      'familyName': ['', [
        Validators.required,
        Validators.pattern('.{2,20}')
      ]],
      'patroName': ['', [
        Validators.required,
        Validators.pattern('.{2,20}')
      ]],
      'email': ['', [
        Validators.required,
        Validators.pattern('[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})')
      ]],
      'phone': ['', [
        // Validators.pattern('[0-9]{10}')
      ]],
      'school': ['', [
        Validators.required
      ]],
      'form': ['', [
        Validators.required
      ]]
    });
  }

  signUp(event) {
    event.preventDefault(); // отменяем стандартное действие

    if (!this.loading && this.form.valid) {
      // собираем информацию с полей
      const userData = {
        firstName: this.form.value.firstName,
        familyName: this.form.value.familyName,
        patroName: this.form.value.patroName,
        email: this.form.value.email.toLowerCase(),
        phone: this.form.value.phone,
        school: this.form.value.school,
        form: this.form.value.form
      };

      // отправляем запрос на сервер
      this.loading = true;
      this.http.post(userData, '/register').subscribe(
        user => {
          this.loading = false;

          // выводим сообщение об успехе
          this.common.alert(`We have sent an e-mail to the "${user.email}". Please check it out!`);
        },
        error => {
          this.loading = false;

          // обработка ошибок
          const status = error._body;
          switch (status) {
            case 'email exists':
              // если такой пользователь уже есть, то предлагается восстановить пароль
              this.common.alert('Annotator with this email is already exists in the system. Please sign in or request a new password.');
              break;

            case 'email exists resend':
              // если такой пользователь уже есть, то предлагается восстановить пароль
              this.common.alert('Annotator with this email is already exists in the system, but the email has not been confirmed. We have sent you a new letter for confirmation.');
              break;

            case 'login exists':
              // если такой пользователь уже есть, то предлагается восстановить пароль
              this.common.alert('Annotator with this login is already exists in the system.');
              break;

            default:
              console.error(status);
              break;
          }
        }
      );
    }
  }
}
