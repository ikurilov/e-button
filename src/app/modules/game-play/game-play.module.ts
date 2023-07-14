import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamePlayRoutingModule } from './game-play-routing.module';
import { CurentSlideComponent } from './components/curent-slide/curent-slide.component';
import { LeadButtonsComponent } from './components/lead-buttons/lead-buttons.component';
import { TeamBoardComponent } from './components/team-board/team-board.component';
import { InitConfigComponent } from './components/init-config/init-config.component';
import { GamePlayLayoutComponent } from './components/game-play-layout/game-play-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { PlayersEffects } from './players-store/players.effects';
import { playersReducer } from './players-store/players.reducer';
import { gamePlayReducer } from './store/game-play.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GamePlayEffects } from './store/game-play.effects';
import { FightListComponent } from './components/fight-list/fight-list.component';
import { ScreenMessagesEffects } from './store/screen-messages.effects';
import { GamePlayAudioEffects } from './store/game-play-audio.effects';
import { GameVitalsComponent } from './components/game-vitals/game-vitals.component';
import { RatioBoxViewerModule } from '../ratio-box-viewer/ratio-box-viewer.module';
import { SoundBoardComponent } from './components/sound-board/sound-board.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalChangeScoreComponent } from './components/modal-change-score/modal-change-score.component';

@NgModule({
  declarations: [
    CurentSlideComponent,
    LeadButtonsComponent,
    TeamBoardComponent,
    InitConfigComponent,
    GamePlayLayoutComponent,
    FightListComponent,
    GameVitalsComponent,
    SoundBoardComponent,
    ModalChangeScoreComponent,
  ],
  imports: [
    CommonModule,
    GamePlayRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('gamePlay', gamePlayReducer),
    StoreModule.forFeature('players', playersReducer),
    EffectsModule.forFeature([
      GamePlayEffects,
      PlayersEffects,
      ScreenMessagesEffects,
      GamePlayAudioEffects,
    ]),
    RatioBoxViewerModule,
    NgbDropdownModule,
    FormsModule,
  ],
})
export class GamePlayModule {}
