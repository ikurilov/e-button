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

@NgModule({
  declarations: [
    RemoteMainLayoutComponent,
    DefaultScreenComponent,
    ImageQuestionComponent,
    BreakScreenComponent,
    ConnectScreenComponent,
  ],
  exports: [RemoteMainLayoutComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('remote', remoteReducer),
    QRCodeModule,
  ],
})
export class MainModule {}
