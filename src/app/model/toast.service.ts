import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ToastService {

  _alertOn: boolean = false;
  _alertText: string = "";

  alertOn = new BehaviorSubject<boolean>(this._alertOn);
  alertText = new BehaviorSubject<string>(this._alertText);

  createAlert(alertText: string) {
    this._alertOn = true;
    this.alertOn.next(this._alertOn);
    this._alertText = alertText;
    this.alertText.next(this._alertText);
  }

  getAlertText(): BehaviorSubject<string> {
    return this.alertText;
  }

  getAlertOn(): BehaviorSubject<boolean> {
    return this.alertOn;
  }
}
