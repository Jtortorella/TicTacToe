import { Subscription } from 'rxjs'
import { GameService } from 'src/app/model/game.service';
import { ToastService } from 'src/app/model/toast.service';
import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnDestroy {
  alertBoolSubscription: Subscription;
  alertTextSubscription: Subscription;
  alertText: String = "";
  alertOn: boolean = false;
  modal: any;
  options: string[] = [];

  constructor(private toastService: ToastService) {
    
    this.alertBoolSubscription = this.toastService.getAlertOn().subscribe((change) => {
      this.alertOn = change;
      if (this.alertOn == true) {
        this.show();
      }
    });

    this.alertTextSubscription = this.toastService.getAlertText().subscribe((change) => {
      if (change.split(',').length > 1) {
        this.options = change.split(',');
        this.alertText = this.options[0];
      }
      else {
        this.alertText = change;
        this.options = [];
      }

    });
  }
  show() {
    this.modal = document.querySelector("dialog");
    this.modal?.close();
    this.modal?.showModal()
    setTimeout(() => {
      close()
    }, 2000);
  }
  close() {
    this.modal?.close();
    this.alertText = "";
  }
  ngOnDestroy() {
    this.alertText = "";
    this.options = [];
    this.alertBoolSubscription.unsubscribe();
    this.alertTextSubscription.unsubscribe();
  }
}
