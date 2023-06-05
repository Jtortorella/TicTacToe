import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameService } from './model/game.service';
import { TicTacToeBoardComponent } from './view/game/tic-tac-toe-board.component';
import { SquareComponent } from './components/square/square.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './model/toast.service';
import { MenuComponent } from './view/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeBoardComponent,
    SquareComponent,
    ToastComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    GameService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
