import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs'
import { GameService } from 'src/app/model/game.service';

@Component({
  selector: 'app-tic-tac-toe-board',
  templateUrl: './tic-tac-toe-board.component.html',
  styleUrls: ['./tic-tac-toe-board.component.css']
})
export class TicTacToeBoardComponent {
  private elementsChanged: HTMLElement[] = [];
  private viewSubscription: Subscription;
  private gameSubscription: Subscription;
  private turnSubscription : Subscription;
  private checkValue: string = '';
  constructor(private gameService: GameService){
    this.viewSubscription = this.gameService.getViewUpdater().subscribe((change) => {
        this.updateView(change);
    });
    this.turnSubscription = this.gameService.getTurn().subscribe((change) => {
      change == false ? this.checkValue = 'O' : this.checkValue = 'X'
    })
    this.gameSubscription = this.gameService.getGameOn().subscribe((change) => {
      this.resetView();
    })
    
  }

  updateModel(position: number[]) {
    this.gameService.addToModel(position);
  }
  
  updateView(position: number[]) {
    if (position.length > 1) {
      let selectedPlacement = document!.getElementById(position.toString());
      selectedPlacement!.innerText = this.checkValue;
      if (selectedPlacement) {
        this.elementsChanged.push(selectedPlacement);
      }
    }
    
  }
  
  resetView() {
    for (let index = 0; index < this.elementsChanged.length; index++) {
      this.elementsChanged[index].innerText = '';
    }
    
  }
}
