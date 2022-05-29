import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ModalEnterNameComponent } from './components/modal-enter-name/modal-enter-name.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalChangeTeamComponent } from './components/modal-change-team/modal-change-team.component';
import { BubblesComponent } from './components/bubles/bubbles.component';
import { MyTeamComponent } from './components/my-team/my-team.component';
import { ActionsAndInfoComponent } from './components/actions-and-info/actions-and-info.component';

const config: SocketIoConfig = { url: window.location.origin, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ModalEnterNameComponent,
    ModalChangeTeamComponent,
    BubblesComponent,
    MyTeamComponent,
    ActionsAndInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
  ],
  entryComponents: [ModalEnterNameComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
