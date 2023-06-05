import { Component, OnDestroy } from '@angular/core';
import { GameService } from 'src/app/model/game.service';
import { BehaviorSubject, Subscription } from 'rxjs'
@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  constructor(private gameService: GameService) {
  }
}
