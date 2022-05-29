import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { GameOptionsComponent } from './components/game-options/game-options.component';
import { NetworkInfoComponent } from './components/network-info/network-info.component';
import { PhaseControlComponent } from './components/phase-control/phase-control.component';
import { TeamsControlComponent } from './components/teams-control/teams-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgbAccordionModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { ModalEditScoreComponent } from './components/modal-edit-score/modal-edit-score.component';
import { LogDisplayComponent } from './components/log-display/log-display.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    GameOptionsComponent,
    NetworkInfoComponent,
    PhaseControlComponent,
    TeamsControlComponent,
    ScoreBoardComponent,
    ModalEditScoreComponent,
    LogDisplayComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgbAccordionModule,
    NgbNavModule,
    FormsModule
  ]
})
export class MainModule { }
