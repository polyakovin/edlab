import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonService {
  commonAlert;
  commonConfirm;

  alert(message, cb?) {
    $('.modal').modal('hide');
    this.commonAlert.find('.message').html(message);
    this.commonAlert.modal('show');
    this.commonAlert.on('hidden.bs.modal', () => {
      this.commonAlert.off('hidden.bs.modal');
      if (cb) {
        cb();
      }
    });
  }

  confirm(question, cb?) {
    this.commonConfirm.find('.question').html(question);
    this.commonConfirm.modal('show');
    this.commonConfirm.on('hidden.bs.modal', () => {
      this.commonConfirm.off('hidden.bs.modal');
      if (cb) {
        cb();
      }
    });

    return this.confirmed;
  }

  confirmed = new EventEmitter();
  confirmModal(answer) {
    this.confirmed.emit(answer);
  }
}
