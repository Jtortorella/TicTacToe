import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './view/menu/menu.component';
import { TicTacToeBoardComponent } from './view/game/tic-tac-toe-board.component';

const routes: Routes = [
  { path: 'game', component: TicTacToeBoardComponent, runGuardsAndResolvers: 'always' },
  { path: 'menu', component: MenuComponent},
  { path: '**', redirectTo: '/menu', pathMatch: 'full'},
  { path: '/', redirectTo: '/menu', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
