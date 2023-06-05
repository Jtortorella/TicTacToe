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
  alertText: String = "";
  alertOn: boolean = false;
  gameOff: boolean = false;
  modal: any;
  options: string[] = [];

  constructor(private toastService: ToastService,
    private gameService: GameService) {

    this.gameOffSubscription = this.gameService.getGameOff().subscribe((change) => {
      this.gameOff = change;
    })

    this.alertBoolSubscription = this.toastService.getAlertOn().subscribe((change) => {
      this.alertOn = change;
      if (this.alertOn == true) {
        this.show();
      }
    });
    this.alertTextSubscription = this.toastService.getAlertText().subscribe((change) => {
      this.alertText = change;
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
    if (this.gameOff == true) {
      this.gameService.endGame();
    }
  }
  endGame() {
    this.gameService.endGame();
  }
  ngOnDestroy() {
    this.alertText = "";
    this.options = [];
    this.alertBoolSubscription.unsubscribe();
    this.alertTextSubscription.unsubscribe();
    this.gameOffSubscription.unsubscribe();
  }
}
