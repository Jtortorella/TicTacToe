import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/model/game.service';

@Component({
  selector: 'app-tic-tac-toe-board',
  templateUrl: './tic-tac-toe-board.component.html',
  styleUrls: ['./tic-tac-toe-board.component.css']
})
export class TicTacToeBoardComponent implements OnDestroy {
  private elementsChanged: HTMLElement[] = [];
  private viewSubscription: Subscription;
  private gameSubscription: Subscription;
  private turnSubscription: Subscription;
  private checkValue = '';

  constructor(private gameService: GameService) {
    this.viewSubscription = this.gameService.getViewUpdater().subscribe((change: number[]) => {
      this.updateView(change);
    });
    this.turnSubscription = this.gameService.getTurn().subscribe((change: boolean) => {
      this.checkValue = change ? 'X' : 'O';
    });
    this.gameSubscription = this.gameService.getResetView().subscribe((change: boolean) => {
      if (change) {
        this.resetView();
      }
    });
  }

  updateModel(position: number[]) {
    this.gameService.addToModel(position);
  }

  updateView(position: number[]) {
    if (position.length > 1) {
      const selectedPlacement = document.getElementById(position.toString());
      if (selectedPlacement) {
        selectedPlacement.innerText = this.checkValue;
        this.elementsChanged.push(selectedPlacement);
      }
    }
  }

  resetView() {
    for (const element of this.elementsChanged) {
      element.innerText = '_';
    }
    this.elementsChanged = [];
  }

  ngOnDestroy() {
    this.viewSubscription.unsubscribe();
    this.gameSubscription.unsubscribe();
    this.turnSubscription.unsubscribe();
  }
}