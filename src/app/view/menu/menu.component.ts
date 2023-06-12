
import { Component } from '@angular/core';
import { GameService } from 'src/app/model/game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  gameType: boolean = true;

  constructor(private gameService: GameService) {
    this.setGameType(this.gameType);
  }

  setGameType(value: boolean) {
    this.gameType = value;
    this.gameService.setGameType(this.gameType);
  }
}