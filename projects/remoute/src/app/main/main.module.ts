import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteMainLayoutComponent } from './components/remote-main-layout/remote-main-layout.component';
import { DefaultScreenComponent } from './components/default-screen/default-screen.component';
import { ImageQuestionComponent } from './components/image-question/image-question.component';
import { remoteReducer } from './store/remote.reducer';
import { StoreModule } from '@ngrx/store';
import { BreakScreenComponent } from './components/break-screen/break-screen.component';
import { ConnectScreenComponent } from './components/connect-screen/connect-screen.component';
import { QRCodeModule } from 'angularx-qrcode';
import { EffectsModule } from '@ngrx/effects';
import { RemoteEffects } from './store/remote.effects';
import { InfoScreenComponent } from './components/info-screen/info-screen.component';
import { RoundScreenComponent } from './components/round-screen/round-screen.component';
import { ResultScreenComponent } from './components/result-screen/result-screen.component';
import { QuestionTitleComponent } from './components/question-title/question-title.component';
import { QuesrionCountdownComponent } from './components/quesrion-countdown/quesrion-countdown.component';
import { RatioBoxViewerModule } from '../../../../../src/app/modules/ratio-box-viewer/ratio-box-viewer.module';
import { QuestionFightComponent } from './components/question-fight/question-fight.component';
import { QuestionVerdictComponent } from './components/question-verdict/question-verdict.component';

@NgModule({
  declarations: [
    RemoteMainLayoutComponent,
    DefaultScreenComponent,
    ImageQuestionComponent,
    BreakScreenComponent,
    ConnectScreenComponent,
    InfoScreenComponent,
    RoundScreenComponent,
    ResultScreenComponent,
    QuestionTitleComponent,
    QuesrionCountdownComponent,
    QuestionFightComponent,
    QuestionVerdictComponent,
  ],
  exports: [RemoteMainLayoutComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('remote', remoteReducer),
    EffectsModule.forFeature([RemoteEffects]),
    QRCodeModule,
    RatioBoxViewerModule,
  ],
})
export class MainModule {}
