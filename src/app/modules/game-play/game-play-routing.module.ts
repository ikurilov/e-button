import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePlayLayoutComponent } from './components/game-play-layout/game-play-layout.component';

const routes: Routes = [
  {
    path: '',
    component: GamePlayLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamePlayRoutingModule {}
