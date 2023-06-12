import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ToastService {
  private alertOn = new BehaviorSubject<boolean>(false);
  private alertText = new BehaviorSubject<string>('');

  createAlert(alertText: string) {
    this.alertOn.next(true);
    this.alertText.next(alertText);
  }

  getAlertText(): BehaviorSubject<string> {
    return this.alertText;
  }

  getAlertOn(): BehaviorSubject<boolean> {
    return this.alertOn;
  }
}
