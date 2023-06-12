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
  gameOffSubscription: Subscription;
  alertBoolSubscription: Subscription;
  alertTextSubscription: Subscription;
  alertText: string = "";
  alertOn: boolean = false;
  gameOff: boolean = false;
  modal: any;

  constructor(private toastService: ToastService,
    private gameService: GameService) {

    this.gameOffSubscription = this.gameService.getGameOff().subscribe((change: boolean) => {
      this.gameOff = change;
    })

    this.alertBoolSubscription = this.toastService.getAlertOn().subscribe((change: boolean) => {
      this.alertOn = change;
      if (this.alertOn) {
        this.show();
      }
    });

    this.alertTextSubscription = this.toastService.getAlertText().subscribe((change: string) => {
      this.alertText = change;
    });
  }
  show() {
    this.modal?.close()
    this.modal = document.querySelector("dialog");
    this.modal?.showModal()
  }
  close() {
    if (!this.gameOff) {
      this.modal?.close();
      this.alertText = "";
    }
  }
  endGame() {
    this.gameService.updateResetView();
    this.gameService.endGame();
  }
  ngOnDestroy() {
    this.alertText = "";
    this.alertBoolSubscription.unsubscribe();
    this.alertTextSubscription.unsubscribe();
    this.gameOffSubscription.unsubscribe();
  }
}