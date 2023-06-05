import { Component } from '@angular/core';
import { GameService } from 'src/app/model/game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  gameType: boolean = true; //True = two player game
  constructor(private gameService: GameService){
    gameService.setGameType(this.gameType)
  }
  setGameType($event: boolean) {
    this.gameService.setGameType($event)
  }
}
