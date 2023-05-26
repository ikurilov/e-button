import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamePlayRoutingModule } from './game-play-routing.module';
import { CurentSlideComponent } from './components/curent-slide/curent-slide.component';
import { LeadButtonsComponent } from './components/lead-buttons/lead-buttons.component';
import { ScoreControlComponent } from './components/score-control/score-control.component';
import { TeamBoardComponent } from './components/team-board/team-board.component';
import { InitConfigComponent } from './components/init-config/init-config.component';
import { GamePlayLayoutComponent } from './components/game-play-layout/game-play-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { PlayersEffects } from './players-store/players.effects';
import { playersReducer } from './players-store/players.reducer';
import { gamePlayReducer } from './store/game-play.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GamePlayEffects } from './store/game-play.effects';
import { FightListComponent } from './components/fight-list/fight-list.component';

@NgModule({
  declarations: [
    CurentSlideComponent,
    LeadButtonsComponent,
    ScoreControlComponent,
    TeamBoardComponent,
    InitConfigComponent,
    GamePlayLayoutComponent,
    FightListComponent,
  ],
  imports: [
    CommonModule,
    GamePlayRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('gamePlay', gamePlayReducer),
    StoreModule.forFeature('players', playersReducer),
    EffectsModule.forFeature([GamePlayEffects, PlayersEffects]),
  ],
})
export class GamePlayModule {}
