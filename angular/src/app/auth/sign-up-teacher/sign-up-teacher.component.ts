import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../common.service';
import { HttpService } from '../../http.service';

@Component({
  selector: 'na-sign-up-teacher',
  templateUrl: './sign-up-teacher.component.html',
  styles: [`
    .form-group {
      margin-bottom: 10px;
    }

    .ng-invalid.ng-pristine + .input-tip, .ng-valid + .input-tip {
      display: none;
    }
  `]
})
export class SignUpTeacherComponent {
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
        phone: this.form.value.phone
      };

      // отправляем запрос на сервер
      this.loading = true;
      this.http.post(userData, '/register/teacher').subscribe(
        user => {
          this.loading = false;

          this.common.alert(`Спасибо, что приняли учасите в проекте edlabs! На почту "${user.email}" пришло подтверждение.`);
        },
        error => {
          this.loading = false;

          switch (error.status) {
            case 400:
              this.common.alert('Пользователь с данным e-mail уже участвует в проекте edlabs.');
              break;

            default:
              console.error(error);
              break;
          }
        }
      );
    }
  }
}
