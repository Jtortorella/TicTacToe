import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './view/menu/menu.component';
import { TicTacToeBoardComponent } from './view/game/tic-tac-toe-board.component';

const routes: Routes = [
  { path: 'game', component: TicTacToeBoardComponent },
  { path: 'menu', component: MenuComponent },
  { path: '**', redirectTo: '/menu' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
